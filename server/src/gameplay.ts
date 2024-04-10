import { GameState, Player, Tile, community_spaces, resource_counts, road_spaces, road_keys, community_meta_data } from "../../shared/types";
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
          tiles: []
     }
}
type ResourceGainKey = keyof typeof current_game.current_player.resource_gain;
type ResourcesKey = keyof typeof current_game.current_player.hand;
/**
 * Dictionary of the neighbors. Each index is correlated with the road space number 
 * that that spot is in on the tile from the key.
 */
const neighbors = {
     0: [3, 4, 1, null, null, null],
     1: [4, 5, 2, null, null, 0],
     2: [5, 6, null, null, null, 2],
     3: [7, 8, 4, 1, null, null],
     4: [8, 9, 5, 1, 0, 3],
     5: [9, 10, 6, 3, 2, 4],
     6: [10, 11, null, null, 2, 5],
     7: [null, 12, 8, 3, null, null],
     8: [12, 13, 9, 4, 3, 7],
     9: [13, 14, 10, 5, 4, 8],
     10: [14, 15, 11, 6, 5, 9],
     11: [15, null, null, null, 6, 10],
     12: [null, 16, 14, 8, 7, null],
     13: [16, 17, 14, 9, 6, 12],
     14: [17, 18, 15, 10, 9, 13],
     15: [18, null, null, 11, 10, 14],
     16: [null, null, 17, 13, 12, null],
     17: [null, null, 18, 14, 13, 16],
     18: [null, null, null, 15, 14, 18]
}
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



function buyRoad(tile: Tile, road: road_keys){
     const player = current_game.current_player;
     // verify needed resources
     var canBuy = true;
     if(player.hand["brick"] == 0){
          canBuy = false;
     }

     if(player.hand["wood"] == 0){
          canBuy = false;
     }

     // if(!player.potential_roads.includes(tile.road_spaces[road as keyof typeof road_spaces])){
     //      canBuy = false;
     // }

     // TODO: verify road is not already taken
     if(tile.road_spaces[road] != 0){
          canBuy = false;
     }

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;
          //player.roads_owned.push(road);

          //update potential roads and potential communities
          //const index = player.potential_roads.indexOf(road);
          //player.potential_roads.splice(index, 1);

          //TODO: add the stuff
     }
}


function buySettlement(settlement: community_meta_data){
     const player = current_game.current_player;
     // verify needed resources
     var canBuy = true;
     if(player.hand["brick"] == 0){
          canBuy = false;
     }

     if(player.hand["wood"] == 0){
          canBuy = false;
     }

     if(player.hand["sheep"] == 0){
          canBuy = false;
     }

     if(player.hand["wheat"] == 0){
          canBuy = false;
     }

     if(!player.potential_communities.includes(settlement)){
          canBuy = false;
     }

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood sheep and wheat and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;
          player.hand["sheep"] = player.hand["sheep"] - 1;
          player.hand["wheat"] = player.hand["wheat"] - 1;
          player.communities_owned.push(settlement);
          
          //update potential communities
          const index = player.potential_communities.indexOf(settlement);
          player.potential_communities.splice(index, 1);
          //TODO: add the stuff
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

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, setGameState, buyRoad, buySettlement }