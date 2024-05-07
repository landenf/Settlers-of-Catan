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

const player_data = require("./StaticData/PlayerData");
const { InvalidEndpointError } = require('./src/errors');

// setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"))


// open app server.
// TODO: Run API on online hosting.
const server = app.listen(port, () => {console.log("Server Started")} )


// setup for Websocket Server
// this connects our wss to the server we are already using. This means we can run everything on the same 5000 port.
const wss = new WebSocket.Server({ server: server});

// should increment for each additional client that joins. TODO: get this when we set up landing page and game start!
var client_id = 1;

// objects representing all players. TODO: get this when we set up the landing page and game start!
const clients = player_data.players

/**
 * Becomes true if there are no more games currently being played.
 */
let no_games_left = false;

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
            const new_game = gameplay.generateGame(body.state.client);
            body.state.id = new_game.id;
            break;
        case "joinGameByID":
            const join_game = gameplay.joinGame(body.state.client, body.id);
            body.state.id = join_game.id
            break;
        case "joinRandomGame":
            const random_game = gameplay.joinGame(body.state.client, body.id);
            body.state.id = random_game.id
            break;
        case "leaveGame":
            no_games_left = gameplay.leaveGame(body.state.id, body.state.client);
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
        default:
            throw new InvalidEndpointError(`Endpoint "${request}" is not valid!`);
    }
    updateFrontend(body.state.id);
}

/**
 * Function used to send a limited gamestate to every client
 * using the websocket.
 */
function updateFrontend(session_id) {
    wss.clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN && !no_games_left && gameplay.findPlayerInGame(session_id, client.id)) {
            let state = gameplay.switchClient(client.id, session_id)
            client.send(JSON.stringify(state))
        } else if (gameplay.findPlayerCantJoin(client.id)) {
            client.send(JSON.stringify(gameplay.getNullGame()))
            no_games_left = false;
        }
    });
}

// initialize socket connection
wss.on('connection', (ws, req) => {
    ws.id = client_id;
    client_id++;

    ws.on('message', message => {
        let request = JSON.parse(message)
        if (request.body.state.client.id == 0) {
            request.body.state.client = gameplay.assignClientId(request.body.state.client, ws.id)
        }
        handleRequest(request.endpoint, request.body)
      });    

    // might need to include logic to close up the server
    ws.on('close', () => {
    });
});
