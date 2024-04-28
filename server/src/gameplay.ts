import { GameState, Player, road_keys, community_meta_data, road_meta_data, LimitedSession, LimitedPlayer } from "@shared/types";
import { tiles } from "../StaticData/TileData"
import { players } from "../StaticData/PlayerData";
import { InvalidResourceError } from "./errors";
import { assignPlayerColor, newGame, reassignPlayers } from "./lobby";

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
     isValid: false
}

/**
 * List of all games currently being played.
 * TODO: Replace example game with games from the landing page / join page!
 */
var all_games: GameState[] = []

/**
 * List of players who tried to connect to a game but didn't find one.
 */
var failed_to_connect: Player[] = []


type ResourceGainKey = keyof typeof null_game.current_player.resource_gain;
type ResourcesKey = keyof typeof null_game.current_player.hand;

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
     5: [9, 10, 6, 2, 1, 4],
     6: [10, 11, -1, -1, 2, 5],
     7: [-1, 12, 8, 3, -1, -1],
     8: [12, 13, 9, 4, 3, 7],
     9: [13, 14, 10, 5, 4, 8],
     10: [14, 15, 11, 6, 5, 9],
     11: [15, -1, -1, -1, 6, 10],
     12: [-1, 16, 13, 8, 7, -1],
     13: [16, 17, 14, 9, 8, 12],
     14: [17, 18, 15, 10, 9, 13],
     15: [18, -1, -1, 11, 10, 14],
     16: [-1, -1, 17, 13, 12, -1],
     17: [-1, -1, 18, 14, 13, 16],
     18: [-1, -1, -1, 15, 14, 18]
 }
 export type NeighborsKey = keyof typeof neighbors;

/**
 * Finds a game's index in the all_games list by its session ID.
 * @param sessionId session ID assigned to each unique game
 */
function findGameIndexById(sessionId: number) {
     let index = 0;
     for (let i = 0; i < all_games.length; i++) {
          if (sessionId == all_games[i].id) {
               index = i;
          }
     }
     return index;
}
 
/**
 * Function to roll the dice and distribute resources based upon the result.
 */
function handleDiceRoll(sessionId: number) {

     // get current game
     const current_game = all_games[findGameIndexById(sessionId)]

     // roll dice
     rollDice(sessionId);
     let numRolled = current_game.diceNumber
     let trueNumber: any = numRolled.number1 + numRolled.number2;

     // handle resource distribution
     if (trueNumber != 7) {
          distributeCards(trueNumber, sessionId)
     } 
     return getGamestate(sessionId);
}

/**
 * Updates every player's resources counts.
 */
function updateResourceCounts(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

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
function distributeCards(numRolled: ResourceGainKey, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     for(let i = 0; i < current_game.players.length; i++) {
          const player = current_game.players[i];
          const map = player.resource_gain[numRolled];
          player.hand["wheat"] += map["wheat"];
          player.hand["brick"] += map["brick"];
          player.hand["sheep"] += map["sheep"];
          player.hand["stone"] += map["stone"];
          player.hand["wood"] += map["wood"];
     }
     updateResourceCounts(sessionId);
}

/**
 * Rolls two dice and updates it in the current_game.
 */
function rollDice(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

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

function buyDevCard(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

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
          updateResourceCounts(sessionId);
     }

     return getGamestate(sessionId);
}

/**
 * Handles the stealing part of the knight card.
 * @param victimId the index of the player who's being stolen from
 */
function handleKnight(victimId: number, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

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
     
     return getGamestate(sessionId);

}

/**
 * Updates the backend to reflect the user choosing to not steal
 * from any players as a result of their development card.
 */
function cancelSteal(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     current_game.current_player.hasKnight = false;
     return getGamestate(sessionId);
}


/**
 * Function that controls buying a road. Only one road_meta data is needed.
 * Using the meta data from that road, we will find the neighbor necessary.
 * 
 * @param road the road the player is trying to buy
 * @returns the updated gamestate
 */
function buyRoad(road: road_meta_data, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     const player = current_game.current_player;
     // verify player has needed resources
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

          potentialUpdatesRoad(road, sessionId);
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
               potentialUpdatesRoad(neighbor_road, sessionId)

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
function potentialUpdatesRoad(road: road_meta_data, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]
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
function tradeWithBank(resourceOffer: string, resourceGain: string, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     const player = current_game.current_player;

     let translatedOffer = translateToResourcesKey(resourceOffer)
     let translatedGain = translateToResourcesKey(resourceGain)

     if (player.hand[translatedOffer] >= 3){
          player.hand[translatedOffer] -= 3;
          player.hand[translatedGain]++;
     }

     updateResourceCounts(sessionId);

     return getGamestate(sessionId);

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
function checkWinState(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

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
function passTurn(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

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
     return getGamestate(sessionId);

}

/**
 * Used to switch clients. 
 */
function switchClient(player_id: number, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     let player_index = 0;
     for (let i = 0; i < current_game.players.length; i++) {
          if (player_id == current_game.players[i].id) {
               player_index = i;
          }
     }
     current_game.client = current_game.players[player_index]
     return getGamestate(sessionId);
}

/**
 * Translates current game to a limited state object.
 */
function translateToLimitedState(sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     var limited_players: LimitedPlayer[] = []
     current_game.players.forEach(player => {
          limited_players.push({
               id: player.id,
               name: player.name,
               image: player.image,
               color: player.color,
               vp: player.vp,
               resources: player.resources
          })
     });

     var current_limited_player: LimitedPlayer = {
          id: current_game.current_player.id,
          name: current_game.current_player.name,
          image: current_game.current_player.image,
          color: current_game.current_player.color,
          vp: current_game.current_player.vp,
          resources: current_game.current_player.resources
     }

     var limited_state: LimitedSession = {
          id: current_game.id,
          client: current_game.client,
          diceNumber: current_game.diceNumber,
          players: limited_players,
          current_player: current_limited_player,
          current_largest_army: current_game.current_largest_army,
          current_longest_road: current_game.current_longest_road,
          gameboard: current_game.gameboard,
          isValid: current_game.isValid
     }

     return limited_state
     
}

/**
 * Assigns a unique client ID to the user.
 * @param player the player object to apply the new ID to
 * @param newId the new ID to apply
 * @returns the player object with an updated client ID
 */
function assignClientId(player: Player, newId: number) {
     player.id = newId;
     return player;
}

/**
 * Generates a new game and adds it to the list of all games.
 * @param host the player who's hosting and starting the game
 */
function generateGame(host: Player) {
     const game = newGame(all_games, host)
     all_games.push(game)
     return getGamestate(game.id)
}

/**
 * Adds a player to an existing game, either by random or by a game's ID.
 * @param newPlayer the player that's joining the game
 * @param sessionId the game that the player's joining
 */
function joinGame(newPlayer: Player, sessionId?: number) {

     /** 
      * Total amount of tries we should try to connect to a random game before
      * just making a new one.
      */
     const total_connection_tries = 100;

     let game_index = 0;
     let foundGame = true;

     // if a sessionId wasn't specifed, we look for a random game
     if (sessionId == undefined) {

          // if there are no games yet, we make our own. otherwise, look for a random one.
          if (all_games.length == 0) {
               generateGame(newPlayer);
               sessionId = all_games[game_index].id
               foundGame = false;
          } else {
               game_index = Math.floor(Math.random() * all_games.length);
               sessionId = all_games[game_index].id

               // if the random game had too many players, try looking for a new one
               let current_tries = 0;
               while (all_games[findGameIndexById(sessionId)].players.length == 4 && current_tries < total_connection_tries) {
                    game_index = Math.floor(Math.random() * all_games.length);
                    sessionId = all_games[game_index].id
                    current_tries++;
               }

               if (current_tries === total_connection_tries) {
                    generateGame(newPlayer);
                    game_index = all_games.length - 1;
                    sessionId = all_games[game_index].id
                    foundGame = false;
               }

          }

     } 

     if (foundGame) {
          let game = assignPlayerColor(all_games[findGameIndexById(sessionId)], newPlayer)
          if (!game.isValid) {
               failed_to_connect.push(newPlayer)
               return null_game;
          }
     }
     
     return getGamestate(sessionId)
}

/**
 * Removes a player from the game. If the game has no players,
 * it is removed from the list of ongoing games.
 * @param sessionId the current game to leave
 * @returns false if there are no more games or players
 */
function leaveGame(sessionId: number, client: Player) {
     let game = all_games[findGameIndexById(sessionId)];
     game.players = game.players.filter(player => player.id !== client.id);

     failed_to_connect.push(client)

     if (game.players.length < 1) {
          all_games = all_games.filter(el_game => el_game.id !== game.id)
     } else {
          game = reassignPlayers(game);
     }

     let no_more_games = false
     if (all_games.length == 0) {
          no_more_games = true;
     }
     return no_more_games;
}

/**
 * Finds if a given player is in a given game.
 * @param sessionId the ID of the game to search in
 * @param clientId the ID of the player to search for
 * @returns true if the player was found, false if the player was not.
 */
function findPlayerInGame(sessionId: number, clientId: number) {
     let isInGame = false;
     const game = all_games[findGameIndexById(sessionId)]
     game.players.forEach(player => {
          if (player.id === clientId) {
               isInGame = true;
          }
     });
     return isInGame
}

/**
 * Finds the player who just tried to join a game, but wasn't able to 
 * find a game.
 * @param clientId the id of the client to check against those 
 * who have failed to find a game
 * @returns true if the player can't join the game
 */
function findPlayerCantJoin(clientId: number) {
     if (failed_to_connect.some(player => player.id === clientId)) {
          failed_to_connect = failed_to_connect.filter(player => player.id !== clientId)
          return true
     } else {
          return false
     }
}

/**
 * Translates and updates the gamestate, then returns it.
 * @param sessionId the sessionId of the gamestate to update
 * @returns an updated, limited gamestate
 */
function getGamestate(sessionId: number) {
     updateResourceCounts(sessionId);
     checkWinState(sessionId)
     return translateToLimitedState(sessionId);
}

/**
 * Used when we can't find a game, typically due to trying to join a game
 * via ID when it's already full.
 */
function getNullGame() {
     return null_game;
}

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, handleKnight, cancelSteal, 
     passTurn, switchClient, buyRoad, generateGame, assignClientId, joinGame,
     findPlayerInGame, getNullGame, findPlayerCantJoin, leaveGame }