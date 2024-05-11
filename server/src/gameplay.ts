import { GameState, Player, road_keys, community_meta_data, road_meta_data, LimitedSession, LimitedPlayer, community_keys, community_spaces, resource_counts } from "@shared/types";
import { tiles } from "../StaticData/TileData"
import { players } from "../StaticData/PlayerData";
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
     gameboard: {
          tiles: tiles
     },
     isValid: false,
     canStart: false,
     isStarted: false,
	 roundNumber: 1
}

/**
 * List of all games currently being played.
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
const edge_neighbors = {
     0: [3, 4, 1, -1, -1, -1],
     1: [4, 5, 2, -1, -1, 0],
     2: [5, 6, -1, -1, -1, 1],
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
     18: [-1, -1, -1, 15, 14, 17]
 }

 /**
  * An array of arrays of dictionaries representing all vertices that touch one another.
  * [i] finds all neighbors for all of tile i's 6 vertices
  * [i][j] finds the neighbors for tile i's jth vertex
  */
 const vertex_neighbors = [
     [[[3, 4]], [[3, 3], [4, 5]], [[1, 0], [4, 4]], [[1, 5]], [[-1]], [[-1]]], // 0
     [[[0, 2], [4, 4]], [[4, 3], [5, 5]], [[2, 0], [5, 4]], [[2, 0]], [[-1]], [[-1]]], // 1
     [[[1, 2], [5, 4]], [[5, 3], [6, 5]], [[6, 4]], [[-1]], [[-1]], [[1, 5]]], // 2
     [[[7, 4]], [[7, 3], [8, 5]], [[4, 0], [8, 4]], [[0, 1], [4, 5]], [[0, 4]], [[-1]]], // 3
     [[[3, 2], [8, 4]], [[8, 3], [9, 5]], [[5, 0], [9, 4]], [[1, 1], [5, 5]], [[0, 2], [1, 0]], [[0, 1], [3, 3]]], // 4
     [[[4, 2], [9, 4]], [[9, 3], [10, 5]], [[6, 0], [10, 4]], [[2, 1], [6, 5]], [[1, 2], [2, 0]], [[1, 1], [4, 3]]], // 5
     [[[5, 2], [10, 4]], [[10, 3], [11, 0]], [[11, 4]], [[-1]], [[2, 2]], [[2, 1], [5, 3]]], // 6
     [[[-1]], [[12, 5]], [[8, 0], [12, 4]], [[3, 1], [8, 5]], [[3, 0]], [[-1]]], // 7
     [[[7, 2], [12, 4]], [[12, 3], [13, 5]], [[9, 0], [13, 4]], [[4, 1], [9, 5]], [[3, 2], [4, 0]], [[3, 1], [7, 3]]], // 8
     [[[8, 2], [13, 4]], [[13, 3], [14, 5]], [[10, 0], [14, 4]], [[5, 1], [10, 5]], [[4, 2], [5, 0]], [[4, 1], [8, 3]]], // 9
     [[[9, 2], [14, 4]], [[14, 3], [15, 5]], [[11, 0], [15, 4]], [[6, 1], [11, 5]], [[5, 2], [6, 0]], [[5, 1], [9, 3]]], // 10
     [[[10, 2], [15, 4]], [[15, 3]], [[-1]], [[-1]], [[6, 2]], [[6, 1], [10, 3]]], // 11
     [[[-1]], [[16, 5]], [[13, 0], [16, 4]], [[8, 1], [13, 5]], [[7, 2], [8, 0]], [[7, 1]]], // 12
     [[[12, 2], [16, 4]], [[16, 3], [17, 5]], [[14, 0], [17, 4]], [[9, 1], [14, 5]], [[8, 2], [9, 0]], [[8, 1], [12, 3]]], // 13
     [[[13, 2], [17, 4]], [[17, 3], [18, 5]], [[15, 0], [18, 4]], [[10, 1], [15, 5]], [[9, 2], [10, 0]], [[9, 1], [13, 3]]], // 14
     [[[14, 2], [18, 4]], [[18, 3]], [[-1]], [[-1]], [[11, 1]], [[10, 2], [11, 0]], [[10, 1], [14, 2]]], // 15
     [[[-1]], [[-1]], [[17, 0]], [[13, 1], [17, 5]], [[12, 2], [13, 0]], [[12, 1]]], // 16
     [[[16, 2]], [[-1]], [[18, 0]], [[14, 1], [18, 5]], [[13, 2], [14, 0]], [[13, 1], [16, 3]]], // 17
     [[[17, 2]], [[-1]], [[-1]], [[15, 1]], [[14, 2], [15, 0]], [[14, 1], [17, 3]]] // 18
 ]

export type NeighborsKey = keyof typeof edge_neighbors;

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
 

function initialRoundRoad(road: road_meta_data, sessionId: number){
	const current_game = all_games[findGameIndexById(sessionId)];
	const roadSpaceAvailable = current_game.gameboard.tiles[road.tile_index].road_spaces[road.edge] === "white";
	if(roadSpaceAvailable){
		addingRoad(road, sessionId);
	}

     return getGamestate(sessionId);
}

function initialRoundSettlement(settlement: community_meta_data, sessionId: number){
	addingSettlement(settlement, sessionId);
     return getGamestate(sessionId);
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
function determineDevBenefit(player: Player, sessionId: number) {
     const probability = Math.floor(Math.random() * 10) + 1;
     if (probability < 4) {
          player.vp++;
     } else {
          player.hasKnight = true;
          player.knightCards++;
		  awardLargestArmy(sessionId);

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

          determineDevBenefit(player, sessionId);
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
     const stolen_resource = player_hand[card_index_stolen] as ResourcesKey

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
  * One leg of a "triad" of roads. When one road is placed, typically two more roads 
  * form an outgoing triad from it.
  */
 interface triad_leg { 
     builtRoad: road_meta_data,
     potentialRoad: road_meta_data,
}

/**
 * Compares value of roads and returns true if both values match.
 * @param road1 the road to compare to
 * @param road2 to road to compare
 */
function compareRoads(road1: road_meta_data, road2: road_meta_data) {

     let sameRoad = false;

     if (road1.edge == road2.edge) {
          if (road1.tile_index == road2.tile_index) {
               sameRoad = true;
          }
     }

     return sameRoad;
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

     const hasResources = player.hand["brick"] > 0 && player.hand["wood"] > 0;

     // Check if the road  exists in the player's potential roads
     const roadExists = player.potential_roads.some(
         (pr) => pr.tile_index === road.tile_index && pr.edge === road.edge
     );
     
     const roadSpaceAvailable = current_game.gameboard.tiles[road.tile_index].road_spaces[road.edge] === "white";
     
     const canBuy = hasResources && roadExists && roadSpaceAvailable;

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;

		addingRoad(road, sessionId);
     }

     awardMostRoads(sessionId);
     return getGamestate(sessionId);
}

/**
 * Adds the road to the current player, and takes away that road from the current player.
 * 
 * @param road the road you are adding
 * @param sessionId 
 */
function addingRoad(road: road_meta_data, sessionId: number){
	const current_game = all_games[findGameIndexById(sessionId)]

	const player = current_game.current_player;
   	player.roads_owned.push(road);

	current_game.gameboard.tiles[road.tile_index].road_spaces[road.edge] = player.color;

     current_game.players.forEach(loop_player => {
          for (let i = 0; i < loop_player.potential_roads.length; i++){
               if (loop_player.id != player.id && compareRoads(loop_player.potential_roads[i], road)){
                    loop_player.potential_roads.splice(i, 1);
               }
          }
     });
	addAllPotentialsWithRoad(road, sessionId);

}
/**
 * Helper function to add all potentials when buying a road.
 * 
 * @param road road meta data
 * @param player the current player whos potentials you are updating
 */
function addAllPotentialsWithRoad(road: road_meta_data, sessionId: number){
	const current_game = all_games[findGameIndexById(sessionId)]
	const player = current_game.current_player;


    //add all potential roads and neighboring potential roads and keep track of possible roads
    const addedPotentialRoads: triad_leg[] = [];
    const possible_roads: triad_leg[] = [];
     
    let tileTriads = potentialUpdatesRoad(road, sessionId);

    addedPotentialRoads.push(...tileTriads); 
    possible_roads.push(...checkAroundRoads(road))
    // code to add the road in the representation of the neighboring tile. For example, edge 3 
    // on one tile might correspond to edge 2 on the neighboring tile, and in order to preserve
    // the z-index of rendering, we must render the road on both.
    const neighbor_index = edge_neighbors[road.tile_index as NeighborsKey][road.edge];

    if(neighbor_index != -1 ){
    	const neighbor_edge = edge_neighbors[neighbor_index as NeighborsKey].indexOf(road.tile_index);
		const neighbor_road: road_meta_data = {
			tile_index: neighbor_index,
			edge: neighbor_edge as road_keys
		}
		current_game.gameboard.tiles[neighbor_road.tile_index].road_spaces[neighbor_road.edge] = player.color;
		player.roads_owned.push(neighbor_road);
		let NeighborTriads = potentialUpdatesRoad(neighbor_road, sessionId);
		addedPotentialRoads.push(...NeighborTriads); 
		possible_roads.push(...checkAroundRoads(neighbor_road))
    } else {
          findPotentialsOnBoardEdges(road, sessionId);
          const newleg = checkRoadsAroundOnEdges(road, sessionId)
          if (newleg !== undefined) {
               possible_roads.push(newleg)
          }
    }

    // add potential settlements by checking all roads around the bought road
    if (possible_roads.length == 2) {
        checkForPotentialSettlements([possible_roads[0], possible_roads[1]], sessionId)
    }
    if (possible_roads.length == 3) {
        checkForPotentialSettlementsOnEdge(possible_roads, sessionId)
    }
    if (possible_roads.length == 4) {
        checkForPotentialSettlements([possible_roads[0], possible_roads[3]], sessionId)
        checkForPotentialSettlements([possible_roads[1], possible_roads[2]], sessionId)
    }

    current_game.players.forEach(player => {
     player.communities_owned.forEach(community => {
          cleanPotentials(community, sessionId)
     })
    })
}

/**
 * Helper function used to determine if a road edge is being added 
 * "clockwise" or "counterclockwise" is relation to edges on the board.
 * @param road the road that's just been built
 * @returns true if clockwise, false if counterclockwise
 */
function determineClockwiseRotation(road: road_meta_data) {

     const first_sector = [7, 12, 16];
     const second_sector = [16, 17, 18];
     const third_sector = [18, 15, 11];
     const fourth_sector = [11, 6, 2];
     const fifth_sector = [2, 1, 0];
     const sixth_sector = [0, 3, 7]

     const sectors = [first_sector, second_sector, third_sector, fourth_sector, fifth_sector, sixth_sector];

     let sector_count = 0;
     let isClockwise = false;

     sectors.forEach(sector => {
          if (sector.some(index => index === road.tile_index)) {
               if (road.edge === sector_count) {
                    isClockwise = true;
               }
          }
          sector_count++;
     });

     return isClockwise;

}

/**
 * Polyfills a bug associated with adding roads on the edges of the board.
 * @param road the road that's just been built
 * @param sessionId the game ID of the current game session
 */
function findPotentialsOnBoardEdges(road: road_meta_data, sessionId: number) {

     const edge_tiles = [7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 0, 3];
     const edge_index = edge_tiles.findIndex(number => number === road.tile_index);

     const current_game = all_games[findGameIndexById(sessionId)];
     const player = current_game.current_player;

     const isClockwise = determineClockwiseRotation(road);

     let tile_index = edge_index;
     let tile_edge = road.edge;

     let offset_vertex = 0;

     if (isClockwise) {
          tile_index = (tile_index + 1) % edge_tiles.length;
          tile_edge = (tile_edge + 5) % 6;
          offset_vertex = (road.edge + 1) % 6;
     } else {
          tile_index = (tile_index + (edge_tiles.length - 1)) % edge_tiles.length;
          tile_edge = (tile_edge + 1) % 6
          offset_vertex = (road.edge + 5) % 6;
     }

     const newRoad: road_meta_data = {tile_index: edge_tiles[tile_index], edge: tile_edge as community_keys}

     const newLeg : triad_leg = {
          builtRoad : road,
          potentialRoad: newRoad
     }

     const first_neighbors = vertex_neighbors[road.tile_index][road.edge]
     const second_neighbors = vertex_neighbors[road.tile_index][offset_vertex]

     let third_leg_needed = true
     if (first_neighbors[0][0] == -1 && second_neighbors[0][0] == -1) {
          third_leg_needed = false;
     }

     if (third_leg_needed && player.potential_roads.indexOf(newRoad) < 0 && current_game.gameboard.tiles[newRoad.tile_index].road_spaces[newRoad.edge] == 'white') {
          player.potential_roads.push(newRoad);
          const noncurrent_players = current_game.players.filter(element => element !== player)
          noncurrent_players.forEach(player => 
               player.potential_roads.filter(road => road != newRoad)
          )
     }

     return newLeg;
     
}

/**
 * Helper function to update potential roads from the roads that have been bought.
 * @param road the road you are updating based on
 */
function potentialUpdatesRoad(road: road_meta_data, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]
     const player = current_game.current_player;

     // remove bought from potential road
     player.potential_roads = player.potential_roads.filter(
          (current) => !(current.tile_index === road.tile_index && current.edge === road.edge)
      );

     // add two new potential roads that are associated with this tile
     // Calculate the edges wrapping around using modulus
     const edgePrev = (road.edge + 5) % 6; // Wrap around to previous edge
     const edgeNext = (road.edge + 1) % 6; // Wrap around to next edge
 
     // Road for the previous edge
     const roadPrev: road_meta_data = {
         tile_index: road.tile_index,
         edge: edgePrev as road_keys
     };
 
     // Road for the next edge
     const roadNext: road_meta_data = {
         tile_index: road.tile_index,
         edge: edgeNext as road_keys
     };

     // Add and check for previous road if not already present
     if (player.potential_roads.indexOf(roadPrev) < 0 && current_game.gameboard.tiles[roadPrev.tile_index].road_spaces[roadPrev.edge] == 'white') {
          player.potential_roads.push(roadPrev);
          checkForNeighborPotentialRoad(roadPrev, sessionId);
     }
 
     
     // Add and check for next road if not already present
     if (player.potential_roads.indexOf(roadNext) < 0 && current_game.gameboard.tiles[roadNext.tile_index].road_spaces[roadNext.edge] == 'white') {
          player.potential_roads.push(roadNext);
          checkForNeighborPotentialRoad(roadNext, sessionId);
     }

     //construct triad legs
     let legPrevious : triad_leg = {
          builtRoad : road,
          potentialRoad: roadPrev
     }
     let legNext : triad_leg = {
          builtRoad : road,
          potentialRoad: roadNext
     }

     return [legPrevious, legNext]
 }

/**
 * Helper function to add roads to a neighbor tile if it needs to be added.
 * @param road the road whose neighbor we're looking for
 */
function checkForNeighborPotentialRoad (road: road_meta_data, sessionId: number){
     const current_game = all_games[findGameIndexById(sessionId)]
     const player = current_game.current_player;

     //if there is a neighbor 
     let neighbor = edge_neighbors[road.tile_index as road_keys][road.edge];
     if(neighbor != -1){
          let newEdge = (road.edge + 3) % 6; //handy
          let neighborPotentialRoad : road_meta_data = {
               tile_index: neighbor,
               edge: newEdge as road_keys
          }
          player.potential_roads.push(neighborPotentialRoad)
     }
}

/**
 * Returns all roads that surround the given road 
 * @param road the road to search around
 * @param sessionId the game ID of the current session
 */
function checkAroundRoads(road: road_meta_data) {
     const possible_roads: triad_leg[] = []

     // add two new potential roads that are associated with this tile
     // Calculate the edges wrapping around using modulus
     const edgePrev = (road.edge + 5) % 6; // Wrap around to previous edge
     const edgeNext = (road.edge + 1) % 6; // Wrap around to next edge
 
     // Road for the previous edge
     const roadPrev: road_meta_data = {
         tile_index: road.tile_index,
         edge: edgePrev as road_keys
     };
 
     // Road for the next edge
     const roadNext: road_meta_data = {
         tile_index: road.tile_index,
         edge: edgeNext as road_keys
     };

     //construct triad legs
     let legPrevious : triad_leg = {
          builtRoad : road,
          potentialRoad: roadPrev
     }
     let legNext : triad_leg = {
          builtRoad : road,
          potentialRoad: roadNext
     }

     possible_roads.push(legPrevious);
     possible_roads.push(legNext);

     return possible_roads
}

/**
 * Polyfills a bug associated with adding roads on the edges of the board.
 * @param road the road that's just been built
 * @param sessionId the game ID of the current game session
 */
function checkRoadsAroundOnEdges(road: road_meta_data, sessionId: number) {

     const edge_tiles = [7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 0, 3];
     const edge_index = edge_tiles.findIndex(number => number === road.tile_index);

     const isClockwise = determineClockwiseRotation(road);

     let tile_index = edge_index;
     let tile_edge = road.edge;

     let offset_vertex = 0;

     if (isClockwise) {
          tile_index = (tile_index + 1) % edge_tiles.length;
          tile_edge = (tile_edge + 5) % 6;
          offset_vertex = (road.edge + 1) % 6;
     } else {
          tile_index = (tile_index + (edge_tiles.length - 1)) % edge_tiles.length;
          tile_edge = (tile_edge + 1) % 6
          offset_vertex = (road.edge + 5) % 6;
     }

     const translated_edge = tile_edge as community_keys

     const newRoad: road_meta_data = {tile_index: edge_tiles[tile_index], edge: translated_edge}

     const newLeg : triad_leg = {
          builtRoad : road,
          potentialRoad: newRoad
     }

     const first_neighbors = vertex_neighbors[road.tile_index][road.edge]
     const second_neighbors = vertex_neighbors[road.tile_index][offset_vertex]

     let third_leg_needed = true
     if (first_neighbors[0][0] == -1 && second_neighbors[0][0] == -1) {
          third_leg_needed = false;
     }

     if (third_leg_needed) {
          return newLeg;
     } else {
          return undefined;
     }
     
}

/**
 * Checks for potential settlements given a set of roads.
 * @param triad_legs the two legs of the triad to check
 * @param sessionId the game session to check 
 */
function checkForPotentialSettlements(triad_legs: triad_leg[], sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     let newPotentialSettlements: community_meta_data[] = []

     //for each potential road leg
     triad_legs.forEach(leg => {
          let centerVertex = vertexBetweenRoads(leg.builtRoad.edge, leg.potentialRoad.edge);
          let twoEdgeVertices = [leg.potentialRoad.edge, (leg.potentialRoad.edge + 1) % 6]; 
          let otherVertex = twoEdgeVertices.find(vertex => vertex !== centerVertex);
          check(leg.potentialRoad, centerVertex, otherVertex);
     })

     //for the built road leg
     let centerVertex = vertexBetweenRoads(triad_legs[0].builtRoad.edge, triad_legs[0].potentialRoad.edge);
     let twoEdgeVertices = [triad_legs[0].builtRoad.edge, (triad_legs[0].builtRoad.edge + 1) % 6]; 
     let otherVertex = twoEdgeVertices.find(vertex => vertex !== centerVertex);
     check(triad_legs[0].builtRoad, centerVertex, otherVertex);

     //function to see if there is valid potential communtiy
     function check(currentRoad: road_meta_data, centerVertex: number, otherVertex: number | undefined){
           // get all communities on the tile
           const currentTile = current_game.gameboard.tiles[currentRoad.tile_index];

          const allRelevantVertexes = Object.entries(currentTile.community_spaces)
               .filter(([, value]) => value.color !== 'white') // Filter non-white spaces
               .map(([key,]) => parseInt(key)); // Extract and convert the key to a number

           // find out if there is a settlement by any player on that other vertex 
           if (!allRelevantVertexes.includes(otherVertex as community_keys) && !allRelevantVertexes.includes(centerVertex as community_keys)) {
                let potentialCommunity: community_meta_data = {
                     tile_index: currentRoad.tile_index, 
                     vertex: centerVertex as community_keys  
                 };

                 // find out if there is a settlement by any player on 
                 newPotentialSettlements.push(potentialCommunity);
           }
     }

     //if there is a third tile, find it, and add its vertex to the potential roads. 
     let thirdTile = edge_neighbors[triad_legs[0].potentialRoad.tile_index as road_keys][triad_legs[0].potentialRoad.edge];
     if(thirdTile != -1 && triad_legs[0].builtRoad !== triad_legs[1].builtRoad){
          let thirdVertex = ((vertexBetweenRoads(triad_legs[0].potentialRoad.edge, triad_legs[1].potentialRoad.edge) + 3) % 6) ; // max of the Pr's rotated 180
          let potentialCommunity: community_meta_data = {
               tile_index: thirdTile, 
               vertex: thirdVertex as community_keys
           };
          newPotentialSettlements.push(potentialCommunity);
     }

     //Add potential Settlement if all three legs pass!
     if(newPotentialSettlements.length > 0){
          current_game.current_player.potential_communities.push(...newPotentialSettlements);
     }

     current_game.players.forEach(player => {
          player.communities_owned.forEach(community => {
               cleanPotentials(community, sessionId)
          });
     }

     )
}

/**
 * Given a settlement and sessionID, cleans up potential settlements that aren't
 * one away from each other.
 * @param settlement the settlement to "clean up" around
 * @param sessionID the current game's ID
 */
function cleanPotentials(settlement: community_meta_data, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]
     const player = current_game.current_player

     const relativeCommunities = findRelativeNeighboringVertexFromVertex(settlement);

     if (relativeCommunities.length == 2) {

          //removing potential communities that are on the same vertex.
          current_game.players.forEach(otherPlayer => {
               otherPlayer.potential_communities = otherPlayer.potential_communities.filter(
                    (community) =>
                    (community.tile_index !== settlement.tile_index || community.vertex !== settlement.vertex) &&
                    (community.tile_index !== relativeCommunities[0].tile_index || community.vertex !== relativeCommunities[0].vertex) &&
                    (community.tile_index !== relativeCommunities[1].tile_index || community.vertex !== relativeCommunities[1].vertex)
               );
          });

          // all potential communities that are within one space of the bought settlement
          const tempCommunitiesToRemove = player.potential_communities.filter(
               (community) =>
               isWithinOneVertex(community, settlement) ||
		     isWithinOneVertex(community, relativeCommunities[0]) ||
		     isWithinOneVertex(community, relativeCommunities[1])
          );

          // all potential communities (and neighbors) that are within one space of the bought settlement
          const potentialCommunitiesToRemove: community_meta_data[] = []
          tempCommunitiesToRemove.forEach(community => {
               potentialCommunitiesToRemove.push(community)
               potentialCommunitiesToRemove.push(findRelativeNeighboringVertexFromVertex(community)[0])
               potentialCommunitiesToRemove.push(findRelativeNeighboringVertexFromVertex(community)[1])
          })
          
          // remove list of affected potential communities from all players
          current_game.players.forEach(otherPlayer => {
               otherPlayer.potential_communities = otherPlayer.potential_communities.filter((community) => 
                    !containsCommunity(potentialCommunitiesToRemove, community)
               )
          })

     } else if (relativeCommunities.length == 1) {
          //removing potential communities that are on the same vertex.
	     player.potential_communities = player.potential_communities.filter(
               (community) =>
               (community.tile_index !== settlement.tile_index || community.vertex !== settlement.vertex) &&
               (community.tile_index !== relativeCommunities[0].tile_index || community.vertex !== relativeCommunities[0].vertex)
          );

          // all potential communities that are within one space of the bought settlement
          const tempCommunitiesToRemove = player.potential_communities.filter(
               (community) =>
               isWithinOneVertex(community, settlement) ||
		     isWithinOneVertex(community, relativeCommunities[0])
          );

          // all potential communities (and neighbors) that are within one space of the bought settlement
          const potentialCommunitiesToRemove: community_meta_data[] = []
          tempCommunitiesToRemove.forEach(community => {
               potentialCommunitiesToRemove.push(community)
               potentialCommunitiesToRemove.push(findRelativeNeighboringVertexFromVertex(community)[0])
               potentialCommunitiesToRemove.push(findRelativeNeighboringVertexFromVertex(community)[1])
          })
          
          // remove list of affected potential communities from all players
          current_game.players.forEach(otherPlayer => {
               otherPlayer.potential_communities = otherPlayer.potential_communities.filter((community) => 
                    !containsCommunity(potentialCommunitiesToRemove, community)
               )
          })
          
     } else {
          //removing potential communities that are on the same vertex.
	     player.potential_communities = player.potential_communities.filter(
               (community) =>
               (community.tile_index !== settlement.tile_index || community.vertex !== settlement.vertex)
          );

          // all potential communities that are within one space of the bought settlement
          const tempCommunitiesToRemove = player.potential_communities.filter(
               (community) =>
               isWithinOneVertex(community, settlement)
          );

          // all potential communities (and neighbors) that are within one space of the bought settlement
          const potentialCommunitiesToRemove: community_meta_data[] = []
          tempCommunitiesToRemove.forEach(community => {
               potentialCommunitiesToRemove.push(community)
               potentialCommunitiesToRemove.push({
                    tile_index: vertex_neighbors[community.tile_index][community.vertex][0][0],
                    vertex: vertex_neighbors[community.tile_index][community.vertex][0][1] as community_keys
               })
          })
          
          // remove list of affected potential communities from all players
          current_game.players.forEach(otherPlayer => {
               otherPlayer.potential_communities = otherPlayer.potential_communities.filter((community) => 
                    !containsCommunity(potentialCommunitiesToRemove, community)
               )
          })
     }
}

/**
 * Function to check if a community is within one vertex (plus or minus)
 * @param community the community to check for
 * @param reference the community to check against
 */ 
const isWithinOneVertex = (community: community_meta_data, reference: community_meta_data) => {
     if (community.tile_index !== reference.tile_index) {
          return false;
     }
     const absDiff = Math.abs(community.vertex - reference.vertex);
     return absDiff === 1 || absDiff === 5;
};

/**
 * Checks for potential settlements on the board's edge given three roads
 * @param possible_roads all the possible roads that span from the built edge road
 * @param sessionId the game session to check 
 */
function checkForPotentialSettlementsOnEdge(possible_roads: triad_leg[], sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     let newPotentialSettlements: community_meta_data[] = []
     let triad_legs: triad_leg[] = []

     if (possible_roads[0].potentialRoad.edge == possible_roads[2].potentialRoad.edge) {
          triad_legs = [possible_roads[1], possible_roads[2]]
     } else {
          triad_legs = [possible_roads[0], possible_roads[2]]
     }

     //for first road leg
     let centerVertex1 = vertexBetweenRoads(triad_legs[0].builtRoad.edge, triad_legs[0].potentialRoad.edge);
     let twoEdgeVertices1 = [triad_legs[0].potentialRoad.edge, (triad_legs[0].potentialRoad.edge + 1) % 6]; 
     let otherVertex1 = twoEdgeVertices1.find(vertex => vertex !== centerVertex1);
     check(triad_legs[0].potentialRoad, centerVertex1, otherVertex1);

     // for second road leg
     let centerVertex2 = 0;
     let current_tile_index = triad_legs[0].builtRoad.tile_index;
     let search_neighbors = vertex_neighbors[current_tile_index][centerVertex1]
     search_neighbors.forEach(set_of_neighbors => {
          if (set_of_neighbors[0] == triad_legs[1].potentialRoad.tile_index) {
               centerVertex2 = set_of_neighbors[1]
          }
     });
     let twoEdgeVertices2 = [triad_legs[1].potentialRoad.edge, (triad_legs[1].potentialRoad.edge + 1) % 6]; 
     let otherVertex2 = twoEdgeVertices2.find(vertex => vertex !== centerVertex2);
     check(triad_legs[1].potentialRoad, centerVertex2, otherVertex2);

     // for the built road leg
     let centerVertex = vertexBetweenRoads(possible_roads[0].builtRoad.edge, possible_roads[0].potentialRoad.edge);
     let twoEdgeVertices = [possible_roads[0].builtRoad.edge, (possible_roads[0].builtRoad.edge + 1) % 6]; 
     let otherVertex = twoEdgeVertices.find(vertex => vertex !== centerVertex);
     check(possible_roads[0].builtRoad, centerVertex, otherVertex);

     //function to see if there is valid potential communtiy
     function check(currentRoad: road_meta_data, centerVertex: number, otherVertex: number | undefined){
           
           // get all communtiies on the tile
           const currentTile = current_game.gameboard.tiles[currentRoad.tile_index];

          const allRelevantVertexes = Object.entries(currentTile.community_spaces)
               .filter(([, value]) => value.color !== 'white') // Filter non-white spaces
               .map(([key,]) => parseInt(key)); // Extract and convert the key to a number

           //if there is no settlement vertex by any player on that other vertex it passes
           if (!allRelevantVertexes.includes(otherVertex as community_keys)) {
                let potentialCommunity: community_meta_data = {
                     tile_index: currentRoad.tile_index, 
                     vertex: centerVertex as community_keys  
                 };
                 newPotentialSettlements.push(potentialCommunity);
           }
     }

     //Add potential Settlement if all three legs pass!
     if (newPotentialSettlements.length > 0){
          current_game.current_player.potential_communities.push(...newPotentialSettlements);
     }

     current_game.players.forEach(player => {
          player.communities_owned.forEach(community => {
               cleanPotentials(community, sessionId)
          })
     })

}


/**
 * Handles trading between players and the bank.
 * @param resourceOffer the resource the player is offering
 * @param resourceGain the resource the player is receiving
 */
function tradeWithBank(resourceOffer: string, resourceGain: string, sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]

     const player = current_game.current_player;

     let translatedOffer = resourceOffer as ResourcesKey
     let translatedGain = resourceGain as ResourcesKey

     if (player.hand[translatedOffer] >= 3){
          player.hand[translatedOffer] -= 3;
          player.hand[translatedGain]++;
     }

     updateResourceCounts(sessionId);

     return getGamestate(sessionId);

}

/**
 * Functionality for buying a settlement.
 * 
 * @param settlement info for settlement that is being bought
 */
function buySettlement(settlement: community_meta_data, sessionId: number){
     const current_game = all_games[findGameIndexById(sessionId)]
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

     const filteredCommunities = player.potential_communities.filter(
          (community) => !(
              community.tile_index === settlement.tile_index && 
              community.vertex === settlement.vertex
          )
      );
      
     if(filteredCommunities.length == 0) { canBuy = false;}

     // if can buy, do buying functionality
     if(canBuy){
          //decrease counts buy one for brick and wood sheep and wheat and add the road to the player's list
          player.hand["brick"] = player.hand["brick"] - 1;
          player.hand["wood"] = player.hand["wood"] - 1;
          player.hand["sheep"] = player.hand["sheep"] - 1;
          player.hand["wheat"] = player.hand["wheat"] - 1;
		addingSettlement(settlement, sessionId);

     }
     return getGamestate(sessionId);
}

function addingSettlement(settlement: community_meta_data, sessionId: number){
	const current_game = all_games[findGameIndexById(sessionId)]
	const player = current_game.current_player;

	player.communities_owned.push(settlement); 
     player.vp++;     
     const tile = current_game.gameboard.tiles[(settlement.tile_index)];
     const diceRoll = tile.number_roll as ResourceGainKey;
     const type = tile.type as keyof resource_counts;
     if (type !== "Desert" as keyof resource_counts) {
          player.resource_gain[diceRoll][type] = player.resource_gain[diceRoll][type] + 1;
     }
     
	const relativeCommunities = findRelativeNeighboringVertexFromVertex(settlement);
     relativeCommunities.forEach(community => {
          const nextTile = current_game.gameboard.tiles[(community.tile_index)];
          const nextDiceRoll = nextTile.number_roll as ResourceGainKey;
          const nextType = nextTile.type as keyof resource_counts;
          if (nextType !== "Desert" as keyof resource_counts) {
               player.resource_gain[nextDiceRoll][nextType] = player.resource_gain[nextDiceRoll][nextType] + 1;
          }
     })

     cleanPotentials(settlement, sessionId);
  
	//increase level of the settlement
	current_game.gameboard.tiles[settlement.tile_index].community_spaces[settlement.vertex].level++;
	current_game.gameboard.tiles[settlement.tile_index].community_spaces[settlement.vertex].color = player.color; 

	//find neighbor(s)
	for(let i = -1; i < 1; i++) { 
		 const neighbor_index = edge_neighbors[settlement.tile_index as NeighborsKey][settlement.vertex + i]; // i is -1 and 0 need to get both neighbors
		 if(neighbor_index > -1 ){
			  const neighbor_vertex = edge_neighbors[neighbor_index as NeighborsKey].indexOf(settlement.tile_index) + (1 + i); // offset vertex's
			  const neighbor_settlement: community_meta_data = {
				   tile_index: neighbor_index,
				   vertex: neighbor_vertex as community_keys
			  }
			  let current = current_game.gameboard.tiles[neighbor_settlement.tile_index].community_spaces[neighbor_settlement.vertex]
			  current.level++;
			  current.color = player.color;
		 }
	}
}

/**
 * Checks if a given list has the community
 * @param communities list of communities to check against
 * @param community community to check for
 */
function containsCommunity (communities: community_meta_data[], community: community_meta_data) {

     let containsCommunity = false;

     communities.forEach(element => {
          let validSet = true;
          if (element == undefined || community == undefined) {
               validSet = false; 
          } 
          if (validSet && element.tile_index == community.tile_index) {
               if (element.vertex == community.vertex) {
                    containsCommunity = true;
               }
          }
     })
     return containsCommunity;
}

/**
 * Helper function to find relative vertices at the same spot for the other two tiles given one tile. 
 */
function findRelativeNeighboringVertexFromVertex (community: community_meta_data){
     //given tile 5 vertex 3
     let tileOneVertex = (community.vertex == 0) ? edge_neighbors[community.tile_index as NeighborsKey].length - 1 : community.vertex - 1;
     let tileOne = edge_neighbors[community.tile_index as NeighborsKey][tileOneVertex];
     let tileTwo = edge_neighbors[community.tile_index as NeighborsKey][community.vertex];
     let returnCommuntiies : community_meta_data[] = []

     if(tileOne != -1){
          //for tile one find the edge that touches the origional tile
          let tileOneEdge = edge_neighbors[tileOne as NeighborsKey].indexOf(community.tile_index);
          let tileOneEdgeTwo = edge_neighbors[tileOne as NeighborsKey].indexOf(tileTwo);

          returnCommuntiies.push({
               tile_index: tileOne,
               vertex: vertexBetweenRoads(tileOneEdge, tileOneEdgeTwo) as community_keys //The max of any two edges will be their vertex inbetween
          })
     }

     if(tileTwo != -1){
          //for tile one find the edge that touches the origional tile
          let tileTwoEdge = edge_neighbors[tileTwo as NeighborsKey].indexOf(community.tile_index);
          let tileTwoEdgeTwo = edge_neighbors[tileTwo as NeighborsKey].indexOf(tileOne);
          returnCommuntiies.push({
               tile_index: tileTwo,
               vertex: vertexBetweenRoads(tileTwoEdge, tileTwoEdgeTwo) as community_keys //The max of any two edges will be their vertex inbetween
          })
     }

     return returnCommuntiies;
}

/**
 * Helper function to determine the vertex inbetween two roads.
 */
function vertexBetweenRoads(edge1: number, edge2: number){
     if((edge1 === 0 && edge2 === 5) || (edge1 === 5 && edge2 === 0)){
          return 0
     }else{
          return Math.max(edge1, edge2)
     }
}


/**
 * Awards the most roads to the current player if they have the most roads owned. Updates their victory points accordingly.
 */
function awardMostRoads(sessionId: number){
     const current_game = all_games[findGameIndexById(sessionId)];
     const player = current_game.current_player

     if(current_game.current_longest_road == null){
          current_game.current_longest_road = player;
		  player.hasMostRoads = true;
            player.vp++;
     } else {
          if(current_game.current_longest_road != null && player.roads_owned.length > current_game.current_longest_road.roads_owned.length){
			current_game.players.forEach(player => {
				if (player.hasMostRoads) {
					player.hasMostRoads = false;
					player.vp--;
				}
		   });
            current_game.current_longest_road = player;
            player.vp++;
		  player.hasMostRoads = true;
          }
     }
}

/**
 * Awards largest army to the current player if they have the largest army. Updates their victory points accordingly.
 */
function awardLargestArmy(sessionId: number){
     const current_game = all_games[findGameIndexById(sessionId)];
     const player = current_game.current_player
     if(current_game.current_largest_army == undefined){
          current_game.current_largest_army = player;
		  player.vp++;
		  player.hasLargestArmy = true;
     } else {
        if(current_game.current_largest_army != undefined && player.knightCards > current_game.current_largest_army.knightCards){    

			current_game.players.forEach(player => {
				if (player.hasLargestArmy) {
					player.hasLargestArmy = false;
					player.vp--;
				}
		   });
       		current_game.current_largest_army = player;
       		player.vp++;
			player.hasLargestArmy = true;
        }
     }
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
               endGame(sessionId);
          }
     });
     current_game.winner = winner;
}

/**
 * Ends the current game.
 */
function endGame(sessionId: number){
     let current_game = all_games[findGameIndexById(sessionId)] 
     current_game.isValid = false;
     current_game.isStarted = false;
     current_game = null_game;
     all_games = all_games.splice(findGameIndexById(sessionId), 1);
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
		  current_game.roundNumber++;
     } else {
          next_player_index = current_player_index + 1;
     }

     current_game.current_player = current_game.players[next_player_index];
     return getGamestate(sessionId);

}

/**
 * Used to switch clients. 
 */
function switchClient(player_id: string, sessionId: number) {

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
			   hasLargestArmy: player.hasLargestArmy,
			   hasMostRoads: player.hasMostRoads,
               resources: player.resources,
               ready: player.ready,
          })
     });

     var current_limited_player: LimitedPlayer = {
          id: current_game.current_player.id,
          name: current_game.current_player.name,
          image: current_game.current_player.image,
          color: current_game.current_player.color,
          vp: current_game.current_player.vp,
		  hasLargestArmy: current_game.current_player.hasLargestArmy,
		  hasMostRoads: current_game.current_player.hasMostRoads,
          resources: current_game.current_player.resources,
          ready: current_game.current_player.ready,
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
          isValid: current_game.isValid,
          canStart: current_game.canStart,
          isStarted: current_game.isStarted,
		roundNumber: current_game.roundNumber,
          winner: current_game.winner
     }
     return limited_state
     
}

/**
 * Assigns a unique client ID to the user.
 * @param player the player object to apply the new ID to
 * @param newId the new ID to apply
 * @returns the player object with an updated client ID
 */
function assignClientId(player: Player, newId: string) {
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
               let current_game = all_games[findGameIndexById(sessionId)]
               while (current_game.players.length == 4 && current_tries < total_connection_tries) {
                    game_index = Math.floor(Math.random() * all_games.length);
                    sessionId = all_games[game_index].id
                    current_game = all_games[findGameIndexById(sessionId)]
                    current_tries++;
               }

               if (current_tries === total_connection_tries || current_game.isStarted) {
                    generateGame(newPlayer);
                    game_index = all_games.length - 1;
                    sessionId = all_games[game_index].id
                    foundGame = false;
               }

          }

     } 

     if (foundGame) {
          let game = assignPlayerColor(all_games[findGameIndexById(sessionId)], newPlayer)
          if (!game.isValid || game.isStarted) {
               failed_to_connect.push(newPlayer)
               return null_game;
          }
     }
     
     return getGamestate(sessionId)
}

/**
 * Readies or unreadies the player. Once all players are ready, the game begins.
 */
function handleReady(sessionId: number, client: Player) {
     const current_game = all_games[findGameIndexById(sessionId)]
     current_game.players.map(player => {
          if (player.id === client.id) {
               player.ready = !player.ready
          }
     })
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
function findPlayerInGame(sessionId: number, clientId: string) {
     let isInGame = false;
     const game = all_games[findGameIndexById(sessionId)]
     if(game != undefined){
          game.players.forEach(player => {
               if (player.id === clientId) {
                    isInGame = true;
               }
          });
     }

     return isInGame
}


/**
 * Finds the player who just tried to join a game, but wasn't able to 
 * find a game.
 * @param clientId the id of the client to check against those 
 * who have failed to find a game
 * @returns true if the player can't join the game
 */
function findPlayerCantJoin(clientId: string) {
     if (failed_to_connect.some(player => player.id === clientId)) {
          failed_to_connect = failed_to_connect.filter(player => player.id !== clientId)
          return true
     } else {
          return false
     }
}

/**
 * Checks if the game can start, given enough players have readied up,
 * and updates the gamestate accordingly.
 * @param sessionId the sessionId of the gamestate to check
 * @returns false if the game was not started, true if it was
 */
function updateStarted(sessionId: number) {
     const current_game = all_games[findGameIndexById(sessionId)]
     
     let game_started = true;
     if (current_game.players.length < 2) {
          game_started = false;
     }

     current_game.players.forEach(player => {
          if (!player.ready) {
               game_started = false;
          }
     });

     if (game_started) {
          current_game.canStart = true;
     } else {
          current_game.canStart = false;
     }

     return game_started;
}

/**
 * Starts the given game.
 * @param sessionId the game ID of the session to start
 */
function startGame(sessionId: number) {
     const current_game = all_games[findGameIndexById(sessionId)]
     current_game.isStarted = true;
     return getGamestate(sessionId)
}

/**
 * Translates and updates the gamestate, then returns it.
 * @param sessionId the sessionId of the gamestate to update
 * @returns an updated, limited gamestate
 */
function getGamestate(sessionId: number) {
     const current_game = all_games[findGameIndexById(sessionId)];
     updateResourceCounts(sessionId);
     checkWinState(sessionId);
     updateStarted(sessionId);
     return translateToLimitedState(sessionId);
}

/**
 * Used when we can't find a game, typically due to trying to join a game
 * via ID when it's already full.
 */
function getNullGame(sessionId: number) {
     return null_game;
}

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, handleKnight, cancelSteal, 
     passTurn, switchClient, buyRoad, buySettlement, generateGame, assignClientId, joinGame,
     findPlayerInGame, getNullGame, findPlayerCantJoin, leaveGame, handleReady, startGame, initialRoundRoad, initialRoundSettlement, endGame, findGameIndexById }