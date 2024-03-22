const gameplay = require("./src/gameplay.js")
const express = require('express')
const app = express()
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"))
app.get("/test", (req, res) => {
    res.json({"users": ["userone","usertwo"]})
})

app.post("/rollButtonClicked", (req, res) => {
    const dice1 = gameplay.roll();
    const dice2 = gameplay.roll();
    gameplay.distributeCards(dice1 + dice2);

    res.json({"rolled": [`${dice1}`, `${dice2}`]});
})
app.listen(5000, () => {console.log("Server Started")} )