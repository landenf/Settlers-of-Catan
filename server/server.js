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

const player_data = require("./StaticData/PlayerData")

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

// initialize socket connection
wss.on('connection', (ws, req) => {
    ws.send("connected!");
    ws.id = client_id;
    client_id++;
    ws.on('message', (msg, isBinary) => {
        // goes through each client and sends it
        wss.clients.forEach((client) => {
            // checks to see if it is a different client and if the cient is ready to send to everyone
            // to include yourself, remove ws !== client
            if(ws != client && client.readyState === WebSocket.OPEN) {
                client.send(msg, {binary: isBinary });
            }
        });
    });

    // might need to include logic to close up the server
    ws.on('close', () => {
        console.log('Connection closed');
    });
});

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

// endpoint used to buy development cards
app.post("/buyDevCard", (req, res) => {
    const gamestate = gameplay.buyDevCard(req.body);
    updateFrontend();
    res.json(gamestate);
})

// endpoint used to handle dice rolling
app.post("/roll", (req, res) => {
    const gamestate = gameplay.handleDiceRoll();
    res.json(gamestate)

})

app.post("/tradeBank", (req, res) =>  {
    const gamestate = gameplay.tradeWithBank(req.body.resourceOffered, req.body.resourceGained);
    res.json(gamestate)
})

app.post("/buyRoad", (req, res) => {
    const gamestate = gameplay.buyRoad(req.body.roadData);
    res.json(gamestate);
})

app.post("/buyRoad", (req, res) => {
    const gamestate = gameplay.buyRoad(req.body.roadData);
    res.json(gamestate);
})

// endpoint used to handle stealing from another player using the knight card
app.post("/steal", (req, res) => {
    const gamestate = gameplay.handleKnight(req.body.victim);
    res.json(gamestate)
})

app.post("/cancelSteal", (req, res) => {
    const gamestate = gameplay.cancelSteal();
    res.json(gamestate)
})

app.post("/passTurn", (req, res) => {
    const gamestate = gameplay.passTurn();
    res.json(gamestate)
})

// NOTE: this is to be used by only development tools.
// we have better and safer ways to switch client through
// /passTurn
app.post("/switchClient", (req, res) => {
    const gamestate = gameplay.switchClient(req.body.player);
    res.json(gamestate)
})
