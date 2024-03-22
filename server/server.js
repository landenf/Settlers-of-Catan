const gameplay = require("./src/gameplay")
const express = require('express')
const app = express()
const cors = require("cors");



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"))
app.get("/test", (req, res) => {
    res.json({"users": ["userone","usertwo"]})
})

app.post("/buyDevCard", (req, res) => {
    const gamestate = gameplay.buyDevCard(req.body);
    res.json(gamestate);
})

app.post("/rollButtonClicked", (req, res) => {
    const numRolled = gameplay.rollDice();
    console.log(numRolled);
    
    if (numRolled != 7){
        console.log("hello!");
        const gamestate = gameplay.distributeCards(numRolled);
        res.json(gamestate);
    } else {
        const gamestate = gameplay.getGamestate();
        res.json(gamestate);
    }

})
app.listen(5000, () => {console.log("Server Started")} )