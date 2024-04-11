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
 * The gameplay module which modifies the backend representation of
 * the gameboard and sends it to the frontend.
 */
const gameplay = require("./src/gameplay")

// setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"))

// endpoint used to buy development cards
app.post("/buyDevCard", (req, res) => {
    const gamestate = gameplay.buyDevCard(req.body);
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
    const gamestate = gamestate.buyRoad(req.body.roadData);
    res.json(gamestate);
})

// open app server.
// TODO: Run API on online hosting.
app.listen(5000, () => {console.log("Server Started")} )