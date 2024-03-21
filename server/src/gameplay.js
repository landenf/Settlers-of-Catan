const express = require('express')
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

app.get("/developmentCard", (req, res) => {
     // get current player
     const player = req.currPlayer;

     // check to see if they have the needed resources
     const canBuy = true;
     if (player.resource_counts.get("sheep") == 0){
          canBuy = false;
     }
     if (player.resource_counts.get("wheat") == 0){
          canBuy = false;
     }
     if (player.resource_counts.get("stone") == 0){
          canBuy = false;
     }

     // if can buy, decrease counts buy one and buy dev card
     if(canBuy){
          player.resource_counts.get("sheep") = player.resource_counts.get("sheep") - 1;
          player.resource_counts.get("wheat") = player.resource_counts.get("sheep") - 1;
          player.resource_counts.get("stone") = player.resource_counts.get("sheep") - 1;

          // for now, buying dev card will give an additional VP.
          //TODO: refactor to randomize vp vs army
          player.vp += 1;
     }
     
})
