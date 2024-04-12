import { GameState, Player, Tile, community_spaces, resource_counts, road_spaces, road_keys, community_meta_data, road_meta_data } from "@shared/types";
import { tiles } from "../StaticData/TileData"
import { players } from "../StaticData/PlayerData";
import { InvalidResourceError } from "./errors";

/**
 * This is the gamestate as currently represented in the backend. It is manipulated
 * here in this file, then must be passed via response to the frontend for rendering.
 */
var current_game: GameState = {
     diceNumber: 0,
     players: players,
     current_player: players[0],
     current_largest_army: "",
     current_longest_road: "",
     gameboard: {
          tiles: tiles
     }
}
type ResourceGainKey = keyof typeof current_game.current_player.resource_gain;
type ResourcesKey = keyof typeof current_game.current_player.hand;

/**
 * Dictionary of the neighbors. Each index is correlated with the road space number 
 * that that spot is in on the tile from the key. If it's a -1, then that means this edge
 * is stand-alone and has no neighboring tile.
 */
export const neighbors = {
     0: [3, 4, 1, -1, -1, -1],
     1: [4, 5, 2, -1, -1, 0],
     2: [5, 6, -1, -1, -1, 2],
     3: [7, 8, 4, 0, -1, -1],
     4: [8, 9, 5, 1, 0, 3],
     5: [9, 10, 6, 3, 2, 4],
     6: [10, 11, -1, -1, 2, 5],
     7: [-1, 12, 8, 3, -1, -1],
     8: [12, 13, 9, 4, 3, 7],
     9: [13, 14, 10, 5, 4, 8],
     10: [14, 15, 11, 6, 5, 9],
     11: [15, -1, -1, -1, 6, 10],
     12: [-1, 16, 14, 8, 7, -1],
     13: [16, 17, 14, 9, 6, 12],
     14: [17, 18, 15, 10, 9, 13],
     15: [18, -1, -1, 11, 10, 14],
     16: [-1, -1, 17, 13, 12, -1],
     17: [-1, -1, 18, 14, 13, 16],
     18: [-1, -1, -1, 15, 14, 18]
 }
 export type NeighborsKey = keyof typeof neighbors;
 
/**
 * Function to roll the dice and distribute resources based upon the result.
 */
function handleDiceRoll() {

     // roll dice
     rollDice();
     let numRolled: any;
     numRolled = current_game.diceNumber

     // handle resource distribution
     if (numRolled != 7) {
          distributeCards(numRolled)
     } 
     return getGamestate();
}

/**
 * Function for distributing resources to the players based on the number rolled.
 * NOTE: This function may have to change depending on what what data types is in the players function!
 * 
 * @param {ResourceGainKey} numRolled the number rolled
 */
function distributeCards(numRolled: ResourceGainKey) {
     for(let i = 0; i < current_game.players.length; i++){
          const player = current_game.players[i];
          const map = player.resource_gain[numRolled];
          player.hand["wheat"] += map["wheat"];
          player.hand["brick"] += map["brick"];
          player.hand["sheep"] += map["sheep"];
          player.hand["stone"] += map["stone"];
          player.hand["wood"] += map["wood"];
          player.resources = player.hand["wheat"] 
                              + player.hand["brick"] 
                              + player.hand["sheep"]
                              + player.hand["stone"]
                              + player.hand["wood"];
          
     }
}

/**
 * Rolls two dice and updates it in the current_game.
 */
function rollDice() {
     const dice1 = Math.floor(Math.random() * 6) + 1;
     const dice2 = Math.floor(Math.random() * 6) + 1;
     current_game.diceNumber = dice1 + dice2;
}

function buyDevCard() {
     // check to see if they have the needed resources
     var canBuy = true;
     const player = current_game.current_player;
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
     return current_game;
}


/**
 * Function that controls buying a road. Only one road_meta data is needed.
 * Using the meta data from that road, we will find the neighbor necessary.
 * 
 * @param road the road the player is trying to buy
 * @returns the updated gamestate
 */
function buyRoad(road: road_meta_data){
     const player = current_game.current_player;
     // verify player has needed resources
     var canBuy = true;
     if(player.hand["brick"] == 0){
          canBuy = false;
     }

     if(player.hand["wood"] == 0){
          canBuy = false;
     }

     // if(!player.potential_roads.includes(road)){
     //      canBuy = false;
     // }

     if(current_game.gameboard.tiles[road.tile_index].road_spaces[road.edge] != "grey"){
          canBuy = false;
     }

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;
          player.roads_owned.push(road);
          current_game.gameboard.tiles[road.tile_index].road_spaces[road.edge] = player.color;

          potentialUpdatesRoad(road);
          const neighbor_index = neighbors[road.tile_index as NeighborsKey][road.edge];
          if(neighbor_index != -1 ){
               const neighbor_edge = neighbors[neighbor_index as NeighborsKey].indexOf(road.tile_index);
               const neighbor_road: road_meta_data = {
                    tile_index: neighbor_index,
                    edge: neighbor_edge as road_keys
               }
               console.log(neighbor_road);
               current_game.gameboard.tiles[neighbor_road.tile_index].road_spaces[neighbor_road.edge] = player.color;
               player.roads_owned.push(neighbor_road);
               potentialUpdatesRoad(neighbor_road)

          }


          // add potential communities
          if(road.edge == 0){
               const community_one : community_meta_data = {
                    tile_index: road.tile_index,
                    vertex: 5,
               }

               if(player.potential_communities.indexOf(community_one) < 0) {
                    player.potential_communities.push(community_one);
               }

               const community_two : community_meta_data = {
                    tile_index: road.tile_index,
                    vertex: road.edge,
               }

               if(player.potential_communities.indexOf(community_two) < 0) {
                    player.potential_communities.push(community_two);
               }
          } else if(road.edge == 5){
               const community_one : community_meta_data = {
                    tile_index: road.tile_index,
                    vertex: 0,
               }

               if(player.potential_communities.indexOf(community_one) < 0) {
                    player.potential_communities.push(community_one);
               }

               const community_two : community_meta_data = {
                    tile_index: road.tile_index,
                    vertex: road.edge,
               }

               if(player.potential_communities.indexOf(community_two) < 0) {
                    player.potential_communities.push(community_two);
               }
          }else {
               const community_one : community_meta_data = {
                    tile_index: road.tile_index,
                    vertex: road.edge,
               }

               if(player.potential_communities.indexOf(community_one) < 0) {
                    player.potential_communities.push(community_one);
               }

               const community_two : community_meta_data = {
                    tile_index: road.tile_index,
                    vertex: road.edge - 1,
               }

               if(player.potential_communities.indexOf(community_two) < 0) {
                    player.potential_communities.push(community_two);
               }
          }
     }
     current_game.current_player = player;

     return current_game;
}

/**
 * Helper function to update potential roads from the roads that have been bought.
 * @param road the road you are updating based on
 */
function potentialUpdatesRoad(road: road_meta_data){
     const player = current_game.current_player;

     // remove bought from potential road
     const index = player.potential_roads.indexOf(road);
     player.potential_roads.splice(index, 1);
     
     // add the two new potential roads that are associated with this tile
     if(road.edge == 0){
          const road_one : road_meta_data = {
               tile_index: road.tile_index,
               edge: 5
          }

          if(player.potential_roads.indexOf(road_one) < 0){
               player.potential_roads.push(road_one)
          }
          const road_two : road_meta_data = {
               tile_index: road.tile_index,
               edge: 1
          }

          if(player.potential_roads.indexOf(road_two) < 0){
               player.potential_roads.push(road_two)
          }
     } else if(road.edge == 5){
          const road_one : road_meta_data = {
               tile_index: road.tile_index,
               edge: road.edge - 1 as road_keys
          }

          if(player.potential_roads.indexOf(road_one) < 0){
               player.potential_roads.push(road_one)
          }
          const road_two : road_meta_data = {
               tile_index: road.tile_index,
               edge: 0
          }

          if(player.potential_roads.indexOf(road_two) < 0){
               player.potential_roads.push(road_two)
          }
     } else {
          const new_edge_one = road.edge - 1;
          const road_one : road_meta_data = {
               tile_index: road.tile_index,
               edge: new_edge_one as road_keys
          }

          if(player.potential_roads.indexOf(road_one) < 0){
               player.potential_roads.push(road_one)
          }

          const new_edge_two = road.edge + 1;
          const road_two : road_meta_data = {
               tile_index: road.tile_index,
               edge: new_edge_two as road_keys
          }

          if(player.potential_roads.indexOf(road_two) < 0){
               player.potential_roads.push(road_two)
          }  
     }

}




/**
 * Handles trading between players and the bank.
 * @param resourceOffer the resource the player is offering
 * @param resourceGain the resource the player is receiving
 */
function tradeWithBank(resourceOffer: string, resourceGain: string) {

     const player = current_game.current_player;

     let translatedOffer = translateToResourcesKey(resourceOffer)
     let translatedGain = translateToResourcesKey(resourceGain)

     if (player.hand[translatedOffer] >= 3){
          player.hand[translatedOffer] -= 3;
          player.hand[translatedGain]++;
     }

     return getGamestate();

}

/**
 * Translates a string literal (typically from a JSON object) 
 * to the ResourcseKey type.
 * @param toTranslate the string to translate
 */
function translateToResourcesKey(toTranslate: string) {
     var translation: ResourcesKey
     switch (toTranslate) {
          case "wheat":
               translation = "wheat"
               break;
          case "brick":
               translation = "brick"
               break;
          case "stone":
               translation = "stone"
               break;
          case "sheep":
               translation = "sheep"
               break;
          case "wood":
               translation = "wood"
               break;
          default:
               throw new InvalidResourceError(`The resource type '${toTranslate}' isn't recognized by the system!`);
     }
     return translation
}

function setGameState(gamestate: GameState) {
     current_game = gamestate;
}

function getGamestate() {
     return current_game;
}

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, setGameState, buyRoad }