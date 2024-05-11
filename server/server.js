/**
 * The express module. This is the core of our backend functionality to 
 * call API endpoints.
 */
const express = require('express')

/**
 * The express app. This is the object we use to establish endpoints
 * and set up connections.
 */
const app = express()

/**
 * A module used to add cross-origin resource sharing. Essentially
 * we need it to share resources between our frontend and backend.
 */
const cors = require("cors");

/**
 * A constant for the port we are utilizing.
 */
const port = 5000;

/**
 * The WebSocket initialization. This allows us to utilize Websocket servers.
 */
const WebSocket = require('ws');
/**
 * The gameplay module which modifies the backend representation of
 * the gameboard and sends it to the frontend.
 */
const gameplay = require("./src/gameplay")

const playerData = require("./StaticData/PlayerData");
const { InvalidEndpointError } = require('./src/errors');

// setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"))


// open app server.
const server = app.listen(port, '0.0.0.0', () => {console.log("Server Started")} )


// setup for Websocket Servers
// this connects our wss to the server we are already using. This means we can run everything on the same 5000 port.
const wss = new WebSocket.Server({ server: server});

/**
 * Becomes true if there are no more games currently being played.
 */
let noGamesLeft = false;

/**
 * Handles a frontend request to update the gamestate.
 */
function handleRequest(request, body) {
    switch (request) {
        case "buyDevCard":
            gameplay.buyDevCard(body.state.id);
            break;
        case "roll":
            gameplay.handleDiceRoll(body.state.id);
            break;
        case "tradeBank":
            gameplay.tradeWithBank(body.resourceOffered, body.resourceGained, body.state.id);
            break;
        case "buyRoad":
            gameplay.buyRoad(body.roadData, body.state.id);
            break;
        case "buySettlement":
            gameplay.buySettlement(body.settlementData, body.state.id);
            break;
        case "steal":
            gameplay.handleKnight(body.victim, body.state.id);
            break;
        case "cancelSteal":
            gameplay.cancelSteal(body.state.id);
            break;
        case "passTurn":
            gameplay.passTurn(body.state.id);
            break;
        case "switchClient":
            gameplay.switchClient(body.player, body.state.id);
            break;
        case "generateGame":
            const newGame = gameplay.generateGame(body.state.client);
            body.state.id = newGame.id;
            break;
        case "joinGameByID":
            const joinGame = gameplay.joinGame(body.state.client, body.id);
            body.state.id = joinGame.id
            break;
        case "joinRandomGame":
            const randomGame = gameplay.joinGame(body.state.client, body.id);
            body.state.id = randomGame.id
            break;
        case "leaveGame":
            noGamesLeft = gameplay.leaveGame(body.state.id, body.state.client);
            break;
        case "handleReady":
            gameplay.handleReady(body.state.id, body.state.client)
            break;
        case "startGame":
            gameplay.startGame(body.state.id);
            break;
        case "initialRoadPlacement":
            gameplay.initialRoundRoad(body.roadData, body.state.id);
            break;
        case "initialSettlementPlacement":
            gameplay.initialRoundSettlement(body.settlementData, body.state.id);
            break;
        case "endGame":
            gameplay.endGame(body.state.id);
            break;
        default:
            throw new InvalidEndpointError(`Endpoint "${request}" is not valid!`);
    }
    updateFrontend(body.state.id, body.state.client);
}

/**
 * Function used to send a limited gamestate to every client
 * using the websocket.
 */
function updateFrontend(sessionID, currentClient) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && !noGamesLeft && gameplay.findPlayerInGame(sessionID, client.id)) {

            let state = gameplay.switchClient(client.id, sessionID)
            client.send(JSON.stringify(state))
        } 
        else if (gameplay.findPlayerCantJoin(client.id)) {
            let state = gameplay.getNullGame();
            state.client = currentClient;
            client.send(JSON.stringify(state))
            noGamesLeft = false;

        }
    });
}

// initialize socket connection
wss.on('connection', (ws, req) => {
    ws.id = 0;

    ws.on('message', message => {
        let request = JSON.parse(message)
        ws.id = request.body.state.client.id
        console.log('Client Connected with ID:', ws.id);
        handleRequest(request.endpoint, request.body)
      });    

    // might need to include logic to close up the server
    ws.on('close', () => {
    });
});

app.get('/', (req, res) => {
    res.send('Catan - Server');
  });
  
module.exports = app;