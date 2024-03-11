const express = require('express');
const { players } = require('../../client/src/StaticData/PlayerData');
const app = express()



/**
 * Function for distributing resources to the players based on the number rolled.
 * NOTE: This function may have to change depending on what what data types is in the players function!
 * 
 * @param {*} players list of players in the game
 * @param {int} numRolled the number rolled
 */
function distributeCards(players, numRolled) {
     for(let i = 0; i < players.length; i++){
          const map = players[i].getResources(numRolled);
          for(let j = 0; j < map.length; j++){
               players.resources.get(map[i]) = players.resources.get(map[i]) + 1;
          }
     }
}

app.get("/rollButtonClicked", (req, res) => {
     distributeCards(players, req.numRolled);

     // need to send back updated players
     res.json({""});
})
