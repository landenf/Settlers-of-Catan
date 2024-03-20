const express = require('express')
const app = express()

/**
 * This will get the json for an individual player
 * In req, send the player's id
 */
app.get("/sidebar-player", (req, res) => {
    // dummy values until we can initialize them from req
    const name = "steve";
    const vp = 5;
    res.json({"name": `${name}`,
            "vp": `${vp}`});
});

app.listen(5000, () => {console.log("Server Started")} )