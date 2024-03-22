const express = require('express');
const { players } = require('../../client/src/StaticData/PlayerData');
const app = express()



/**
 * Function for distributing resources to the players based on the number rolled.
 * NOTE: This function may have to change depending on what what data types is in the players function!
 * 
 * @param {int} numRolled the number rolled
 */
function distributeCards(numRolled) {
     for(let i = 0; i < players.length; i++){
          const map = players[i].resource_gain[numRolled];
          console.log(players[i] + ": ");
          for(let j = 0; j < map.length; j++){
               console.log(players.resources.get(map[j]) + ", ");
               players.resources.get(map[j]) = players.resources.get(map[j]) + 1;
          }
     }
}

function roll() {
     return Math.floor(Math.random() * 6) + 1;
}

app.listen(5000, () => {console.log("Server Started")} )

