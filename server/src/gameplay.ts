import { GameState, Player } from "./types";

/**
 * This is the gamestate as currently represented in the backend. It is manipulated
 * here in this file, then must be passed via response to the frontend for rendering.
 */
var current_game: GameState = {
     players: [],
     current_player: {
          id: 0,
          name: "",
          image: "",
          color: "",
          vp: 0,
          hand: {
               wheat: 0,
               brick: 0,
               stone: 0,
               sheep: 0,
               wood: 0
          },
          resources: 0,
          resource_gain: {
               2: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               3: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               4: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               5: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               6: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               8: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               9: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               10: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               11: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               },
               12: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
               }
          },
          communities_owned: [],
          potential_communities: [],
          roads_owned: [],
          potential_roads: [],
          player_stats: {
               total_wins: 0,
               largest_armies: 0,
               most_roads: 0,
               total_vp: 0
          }
     },
     current_largest_army: "",
     current_longest_road: "",
     gameboard: {
          tiles: []
     }
}

/**
 * Function for distributing resources to the players based on the number rolled.
 * NOTE: This function may have to change depending on what what data types is in the players function!
 * 
 * @param {*} players list of players in the game
 * @param {int} numRolled the number rolled
 */
// function distributeCards(players: Player, numRolled: number) {
//      for(let i = 0; i < players.length; i++){
//           const map = players[i].getResources(numRolled);
//           for(let j = 0; j < map.length; j++){
//                players.resources.get(map[i]) = players.resources.get(map[i]) + 1;
//           }
//      }
// }

function buyDevCard(player: Player) {
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

          // for now, buying dev card will give an additional VP.
          //TODO: refactor to randomize vp vs army
          player.vp += 1;
     }
     current_game.players.forEach(player => {
          
     });
}

module.exports = { buyDevCard }