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

function buyDevCard(player) {
     console.log(player);
     // check to see if they have the needed resources
     var canBuy = true;
     if (player.hand["sheep"] == 0){
          canBuy = false;
     }
     if (player.hand["wheat"] == 0){
          canBuy = false;
     }
     if (player.hand["stone"] == 0){
          canBuy = false;
     }

     // if can buy, decrease counts buy one and buy dev card
     if(canBuy){
          player.hand["sheep"] = player.hand["sheep"] - 1;
          player.hand["wheat"] = player.hand["wheat"] - 1;
          player.hand["stone"] = player.hand["stone"] - 1;

          player.resources -= 3;
          // for now, buying dev card will give an additional VP.
          //TODO: refactor to randomize vp vs army
          player.vp += 1;
     }

     return canBuy;
}

module.exports = { buyDevCard, distributeCards }