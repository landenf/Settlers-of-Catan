import { GameState, ResourceType } from "@shared/types";
import { players } from "../StaticData/PlayerData"
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

/**
 * Function to roll the dice and distribute resources based upon the result.
 */
function handleDiceRoll() {

     // roll dice
     rollDice();
     let numRolled: any;
     numRolled = current_game.diceNumber
     var gamestate;

     // handle resource distribution
     if (numRolled != 7) {
          gamestate = distributeCards(numRolled)
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
 * Handles trading between players and the bank.
 * @param resourceOffer the resource the player is offering
 * @param resourceGain the resource the player is receiving
 */
function tradeWithBank(resourceOffer: string, resourceGain: string) {

     // check to see if they have three of the offered resource
     var canTrade = true;
     const player = current_game.current_player;

     if (player.hand[translateToEnum(resourceOffer)] < 3){
          canTrade = false;
     }

}

/**
 * Translates a string literal (typically from a JSON object) 
 * to the resource type enum.
 * @param toTranslate the string to translate
 */
function translateToEnum(toTranslate: string) {
     var translation: ResourceType
     switch (toTranslate) {
          case "wheat":
               translation = ResourceType.Wheat
               break;
          case "brick":
               translation = ResourceType.Brick
               break;
          case "stone":
               translation = ResourceType.Stone
               break;
          case "sheep":
               translation = ResourceType.Sheep
               break;
          case "wood":
               translation = ResourceType.Wood
               break;
          default:
               // TODO: Do something with this, brother!
               throw Error
     }
     return translation
}

function getGamestate() {
     return current_game;
}

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank }