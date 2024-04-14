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

// should increment for each additional client that joins.
var client_id = 1;

// objects representing all players. TODO: get this when we set up the landing page and game start!
const clients = player_data.players

/**
 * Handles a frontend request to update the gamestate.
 */
function handleRequest(request, body) {
    switch (request) {
        case "buyDevCard":
            gameplay.buyDevCard();
            updateFrontend();
            break;
        case "roll":
            gameplay.handleDiceRoll();
            break;
        case "tradeBank":
            gameplay.tradeWithBank(body.resourceOffered, body.resourceGained);
            break;
        case "buyRoad":
            gameplay.buyRoad(body.roadData);
            break;
        case "steal":
            gameplay.handleKnight(body.victim);
            break;
        case "cancelSteal":
            gameplay.cancelSteal();
            break;
        case "passTurn":
            gameplay.passTurn();
            break;
        case "switchClient":
            gameplay.switchClient(body.player);
            break;
        default:
            throw new InvalidEndpointError("That endpoint is not valid!");
    }
    updateFrontend();
}

/**
 * Function used to send a limited gamestate to every client
 * using the websocket.
 */
function updateFrontend() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            let state = gameplay.switchClient(client.id)
            client.send(JSON.stringify(state))
        }
    });
}

// initialize socket connection
wss.on('connection', (ws, req) => {
    ws.id = client_id;
    client_id++;

    updateFrontend();
    
    ws.on('message', message => {
        let request = JSON.parse(message)
        handleRequest(request.endpoint, request.body)
      });    

    // might need to include logic to close up the server
    ws.on('close', () => {
    });
});
