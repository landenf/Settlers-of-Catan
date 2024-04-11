import { GameState, Player } from "@shared/types";
import { players } from "../StaticData/PlayerData"
import { InvalidResourceError } from "./errors";
/**
 * This is the gamestate as currently represented in the backend. It is manipulated
 * here in this file, then must be passed via response to the frontend for rendering.
 * TODO: Set up gamestate using information from the landing page / join page!
 */
var current_game: GameState = {
     id: 0,
     client: players[0],
     diceNumber: {number1: 1, number2: 1},
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
     let numRolled = current_game.diceNumber
     let trueNumber: any = numRolled.number1 + numRolled.number2;

     // handle resource distribution
     if (trueNumber != 7) {
          distributeCards(trueNumber)
     } 
     return getGamestate();
}

/**
 * Updates every player's resources counts.
 */
function updateResourceCounts() {
     for(let i = 0; i < current_game.players.length; i++){
          const player = current_game.players[i];
          player.resources = player.hand["wheat"] +
          player.hand["brick"] + player.hand["sheep"] +
          player.hand["stone"] + player.hand["wood"]
     }
}

/**
 * Function for distributing resources to the players based on the number rolled.
 * NOTE: This function may have to change depending on what what data types is in the players function!
 * 
 * @param {ResourceGainKey} numRolled the number rolled
 */
function distributeCards(numRolled: ResourceGainKey) {
     for(let i = 0; i < current_game.players.length; i++) {
          const player = current_game.players[i];
          const map = player.resource_gain[numRolled];
          player.hand["wheat"] += map["wheat"];
          player.hand["brick"] += map["brick"];
          player.hand["sheep"] += map["sheep"];
          player.hand["stone"] += map["stone"];
          player.hand["wood"] += map["wood"];
     }
     updateResourceCounts();
}

/**
 * Rolls two dice and updates it in the current_game.
 */
function rollDice() {
     const dice1 = Math.floor(Math.random() * 6) + 1;
     const dice2 = Math.floor(Math.random() * 6) + 1;
     current_game.diceNumber = {number1: dice1, number2: dice2}
}

/**
 * Determines if a player receives a knight or vp.
 */
function determineDevBenefit(player: Player) {
     const probability = Math.floor(Math.random() * 10) + 1;
     if (probability < 4) {
          player.vp++;
     } else {
          player.hasKnight = true;
          player.knightCards++;
     }
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

     // if can buy, decrease counts by one and buys dev card
     if(canBuy){
          player.hand["sheep"] = player.hand["sheep"] - 1;
          player.hand["wheat"] = player.hand["wheat"] - 1;
          player.hand["stone"] = player.hand["stone"] - 1;

          determineDevBenefit(player);
          updateResourceCounts();
     }

     return getGamestate();
}

/**
 * Handles the stealing part of the knight card.
 * @param victimId the index of the player who's being stolen from
 */
function handleKnight(victimId: number) {
     const victim = current_game.players[victimId]
     const thief = current_game.current_player
     const card_index_stolen = Math.floor(Math.random() * victim.resources);

     // give all cards to the player hand
     var player_hand = [];

     for (let i = 0; i < victim.hand["wheat"]; i++) {
          player_hand.push("wheat")
     }

     for (let i = 0; i < victim.hand["brick"]; i++) {
          player_hand.push("brick")
     }

     for (let i = 0; i < victim.hand["sheep"]; i++) {
          player_hand.push("sheep")
     }

     for (let i = 0; i < victim.hand["wood"]; i++) {
          player_hand.push("wood")
     }

     for (let i = 0; i < victim.hand["stone"]; i++) {
          player_hand.push("stone")
     }

     // select the resource from the hand and exchange it between players
     const stolen_resource = translateToResourcesKey(player_hand[card_index_stolen])

     victim.hand[stolen_resource]--;
     thief.hand[stolen_resource]++;

     thief.hasKnight = false;
     
     return getGamestate();

}

/**
 * Updates the backend to reflect the user choosing to not steal
 * from any players as a result of their development card.
 */
function cancelSteal() {
     current_game.current_player.hasKnight = false;
     return getGamestate();
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

     updateResourceCounts();

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

/**
 * Checks each player's victory points and sets the game state's winner
 * property accordingly.
 */
function checkWinState() {
     var winner: Player | undefined = undefined;
     current_game.players.forEach(player => {
          if (player.vp >= 10) {
               winner = player;
          }
     });
     current_game.winner = winner;
}

/**
 * Passes the turn to the next player. 
 */
function passTurn() {

     let current_player_index = 0;
     let current_player = current_game.current_player;
     for (let i = 0; i < current_game.players.length; i++) {
          if (current_player.color === current_game.players[i].color) {
               current_player_index = i;
          }
     }

     let next_player_index: number;
     if (current_player_index == (current_game.players.length - 1)) {
          next_player_index = 0;
     } else {
          next_player_index = current_player_index + 1;
     }

     current_game.current_player = current_game.players[next_player_index];
     return getGamestate();

}

function setGameState(gamestate: GameState) {
     current_game = gamestate;
}

function getGamestate() {
     updateResourceCounts();
     checkWinState()
     return current_game;
}

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, setGameState, handleKnight, cancelSteal, passTurn }