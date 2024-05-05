import { GameState, LimitedPlayer, LimitedSession, Player } from "@shared/types";
import { players } from "../StaticData/PlayerData";
import { tiles } from "../StaticData/TileData";

/**
 * This is an empty game. 
 */
var null_game: GameState = {
     id: 0,
     client: players[0],
     diceNumber: { number1: 1, number2: 1 },
     players: players,
     current_player: players[0],
     current_largest_army: "",
     current_longest_road: "",
     gameboard: {
          tiles: tiles
     },
     isValid: false,
     isStarted: false
}

/**
 * Generates a unique game ID. Without this, players can't connect to the same game state!
 */
function generateGameId(all_games: GameState[]) {

    const lowerLimit = 100000
    const upperLimit = 800000
    
    var newGameId = Math.floor(Math.random() * upperLimit) + lowerLimit;

    if (all_games === undefined) {
        return newGameId
    }

     for (let i = 0; i < all_games.length; i++) {
          if (newGameId == all_games[i].id) {
            newGameId = Math.floor(Math.random() * 6) + 1;
            i = 0;
          }
     }

     return newGameId
}

/**
 * Generates a new gamestate object whenever a player creates a new room.
 */
export function newGame(all_games: GameState[], host: Player) {

    const newId = generateGameId(all_games)
    host.color = "red"

    const gamestate: GameState = {
         id: newId,
         client: host,
         diceNumber: { number1: 1, number2: 1 },
         players: [host],
         current_player: host,
         current_largest_army: "",
         current_longest_road: "",
         gameboard: {
              tiles: tiles
         },
         isValid: true,
         isStarted: false
    }

    return gamestate;
}

/**
 * Assigns a unique color to each new player that joins and adds them to the game.
 * @param game the game to add the new player to
 * @param newPlayer the new player that's joining the game
 * @returns the updated game with the new player and their respective new color
 */
export function assignPlayerColor(game: GameState, newPlayer: Player) {

     switch (game.players.length) {
          case 1:
               newPlayer.color = "blue"
               break;
          case 2: 
               newPlayer.color = "orange"
               break;
          case 3: 
               newPlayer.color = "green"
               break;
          default:
               break;
     }

     if (game.players.length < 4) {
          game.players.push(newPlayer)
          return game;
     } else {
          return null_game;
     }
     
}

/**
 * Reassigns all player colors by order of connection.
 * @param game the game to reassign colors to
 */
export function reassignPlayers(game: GameState) {

     const players = game.players
     const colors = ["red", "blue", "orange", "green"]

     for (let i = 0; i < players.length; i++) {
          players[i].color = colors[i]
     }

     game.players = players;
     game.current_player = players[0];

     return game

}