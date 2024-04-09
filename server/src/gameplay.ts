import { GameState, Player, community_spaces, community_spaces, resource_counts, road_spaces, road_spaces } from "../../shared/types";
import { players } from "../StaticData/PlayerData"
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

function buyRoad(road: road_spaces){
     const player = current_game.current_player;
     // verify needed resources
     var canBuy = true;
     if(player.hand["brick"] == 0){
          canBuy = false;
     }

     if(player.hand["wood"] == 0){
          canBuy = false;
     }

     if(!player.potential_roads.includes(road)){
          canBuy = false;
     }

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;
          player.roads_owned.push(road);

          //update potential roads and potential communities
          const index = player.potential_roads.indexOf(road);
          player.potential_roads.splice(index, 1);
          //TODO: add the stuff
     }
}


function buySettlement(settlement: community_spaces){
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

function buyRoad(road: road_spaces){
     const player = current_game.current_player;
     // verify needed resources
     var canBuy = true;
     if(player.hand["brick"] == 0){
          canBuy = false;
     }

     if(player.hand["wood"] == 0){
          canBuy = false;
     }

     if(!player.potential_roads.includes(road)){
          canBuy = false;
     }

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;
          player.roads_owned.push(road);

          //update potential roads and potential communities
          const index = player.potential_roads.indexOf(road);
          player.potential_roads.splice(index, 1);
          //TODO: add the stuff
     }
}


function buySettlement(settlement: community_spaces){
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

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, setGameState }