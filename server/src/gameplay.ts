import { GameState, Player, road_keys, community_meta_data, road_meta_data, LimitedSession, LimitedPlayer, community_keys, community_spaces } from "@shared/types";
import { tiles } from "../StaticData/TileData"
import { players } from "../StaticData/PlayerData";
import { InvalidResourceError } from "./errors";
import { toUSVString } from "util";

/**
 * This is the example game. 
 */
var example_game: GameState = {
     id: 0,
     client: players[0],
     diceNumber: {number1: 1, number2: 1},
     players: players,
     current_player: players[0],
     current_largest_army: "",
     current_longest_road: "",
     gameboard: {
          tiles: tiles
     }
}

/**
 * List of all games currently being played.
 * TODO: Replace example game with games from the landing page / join page!
 */
var all_games: GameState[] = [example_game]


type ResourceGainKey = keyof typeof example_game.current_player.resource_gain;
type ResourcesKey = keyof typeof example_game.current_player.hand;

/**
 * Dictionary of the neighbors. Each index is correlated with the road space number 
 * that that spot is in on the tile from the key. If it's a -1, then that means this edge
 * is stand-alone and has no neighboring tile.
 */
const neighbors = {
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
  * One leg of a "triad" of roads. When one road is placed, typically two more roads 
  * form an outgoing triad from it.
  */
 interface triad_leg { 
     builtRoad: road_meta_data,
     potentialRoad: road_meta_data,
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
          player.roads_owned.push(road);
          current_game.gameboard.tiles[road.tile_index].road_spaces[road.edge] = player.color;

          //add all potential roads and neighboring potential roads
          const addedPotentialRoads: triad_leg[] = [];

          let tileTriads = potentialUpdatesRoad(road, sessionId);
          addedPotentialRoads.push(...tileTriads); 

          // code to add the road in the representation of the neighboring tile. For example, edge 3 
          // on one tile might correspond to edge 2 on the neighboring tile, and in order to preserve
          // the z-index of rendering, we must render the road on both.
          const neighbor_index = neighbors[road.tile_index as NeighborsKey][road.edge];
          if(neighbor_index != -1 ){
               const neighbor_edge = neighbors[neighbor_index as NeighborsKey].indexOf(road.tile_index);
               const neighbor_road: road_meta_data = {
                    tile_index: neighbor_index,
                    edge: neighbor_edge as road_keys
               }
               current_game.gameboard.tiles[neighbor_road.tile_index].road_spaces[neighbor_road.edge] = player.color;
               player.roads_owned.push(neighbor_road);
               let NeighborTriads = potentialUpdatesRoad(neighbor_road, sessionId);
               addedPotentialRoads.push(...NeighborTriads); 
          } else {
               addedPotentialRoads.push(findPotentialsOnBoardEdges(road, sessionId));
          }

          // add potential settlements
          if (addedPotentialRoads.length == 2) {
               checkForPotentialSettlements([addedPotentialRoads[0], addedPotentialRoads[1]], sessionId)
          } else if (addedPotentialRoads.length == 4) {
               checkForPotentialSettlements([addedPotentialRoads[1], addedPotentialRoads[2]], sessionId)
          }

     }

     console.log()

     return getGamestate(sessionId);
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
     const sixth_sector = [1, 0, 3]

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

     if (isClockwise) {
          tile_index = (tile_index + 1) % edge_tiles.length;
          tile_edge = (tile_edge - 1);
     } else {
          tile_index = (tile_index - 1)
          tile_edge = (tile_edge + 1) % 6
     }

     const translated_edge = translateToNumberKey(tile_edge)

     const newRoad: road_meta_data = {tile_index: edge_tiles[tile_index], edge: translated_edge}

     const newLeg : triad_leg = {
          builtRoad : road,
          potentialRoad: newRoad
     }

     if (player.potential_roads.indexOf(newRoad) < 0 && current_game.gameboard.tiles[newRoad.tile_index].road_spaces[newRoad.edge] == 'white') {
          player.potential_roads.push(newRoad);
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
     let neighbor = neighbors[road.tile_index as road_keys][road.edge];
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
 * Checks for potential settlements given a set of roads.
 * @param triad_legs the two legs of the triad to check
 * @param sessionId the game session to check 
 */
function checkForPotentialSettlements(triad_legs: triad_leg[], sessionId: number) {

     const current_game = all_games[findGameIndexById(sessionId)]
     let newPotentialSettlements: community_meta_data[] = []
     let noSurroundingSettlement = true;

     //for each potential road leg
     triad_legs.forEach(leg => {
          let centerVertex = Math.max(leg.builtRoad.edge, leg.potentialRoad.edge);
          let twoEdgeVertices = [leg.potentialRoad.edge, (leg.potentialRoad.edge + 1) % 6]; 
          let otherVertex = twoEdgeVertices.find(vertex => vertex !== centerVertex);
          check(leg.potentialRoad, centerVertex, otherVertex);
     })

     //for the built road leg
     let centerVertex = Math.max(triad_legs[0].builtRoad.edge, triad_legs[0].potentialRoad.edge);
     let twoEdgeVertices = [triad_legs[0].builtRoad.edge, (triad_legs[0].builtRoad.edge + 1) % 6]; 
     let otherVertex = twoEdgeVertices.find(vertex => vertex !== centerVertex);
     check(triad_legs[0].builtRoad, centerVertex, otherVertex);

     //function to if their is valid potential communtiy
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
           }else{
               noSurroundingSettlement = false;
           }
     }

     //if there is a third tile, find it, and add to its vertex to the potential roads. 
     let thirdTile = neighbors[triad_legs[0].potentialRoad.tile_index as road_keys][triad_legs[0].potentialRoad.edge];
     if(thirdTile != -1){
          let thirdVertex = (Math.max(triad_legs[0].potentialRoad.edge, triad_legs[1].potentialRoad.edge) + 3) % 6; // max of the Pr's rotated 180
          let potentialCommunity: community_meta_data = {
               tile_index: thirdTile, 
               vertex: thirdVertex as community_keys
           };
           newPotentialSettlements.push(potentialCommunity);
     }else{
          noSurroundingSettlement = false;
     }

     //Add potential Settlement if all three legs pass!
     if(noSurroundingSettlement){
          current_game.current_player.potential_communities.push(...newPotentialSettlements);
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
          player.communities_owned.push(settlement); //for VP purposes only add once not on neighbors -- todo check this 
          
          
          const relativeCommunities = findRelativeNeighboringVertexFromVertex(settlement);

          //todo edge case fix: if there isnt two relative communities then only check one or errors. 
          //removing potential communities that are on the same vertex.
          player.potential_communities = player.potential_communities.filter(
               (community) =>
               (community.tile_index !== settlement.tile_index || community.vertex !== settlement.vertex) &&
               (community.tile_index !== relativeCommunities[0].tile_index || community.vertex !== relativeCommunities[0].vertex) &&
               (community.tile_index !== relativeCommunities[1].tile_index || community.vertex !== relativeCommunities[1].vertex)
          );

          // Function to check if a community is within one vertex (plus or minus)
          const isWithinOneVertex = (community: community_meta_data, reference: community_meta_data) => {
               if (community.tile_index !== reference.tile_index) {
                   return false;
               }
               const absDiff = Math.abs(community.vertex - reference.vertex);
               return absDiff === 1 || absDiff === 5;
           };
          
          // Get a list of all potential communities within one space (plus or minus one vertex)
          const potentialCommunitiesToRemove = player.potential_communities.filter(
               (community) =>
               isWithinOneVertex(community, settlement) ||
               isWithinOneVertex(community, relativeCommunities[0]) ||
               isWithinOneVertex(community, relativeCommunities[1])
          );

          let allOneAway = findRelativeNeighboringVertexFromVertex(potentialCommunitiesToRemove[0]);
          //removing those potential communties one away
          player.potential_communities = player.potential_communities.filter(
               (community) =>
               (community.tile_index !== potentialCommunitiesToRemove[0].tile_index || community.vertex !== potentialCommunitiesToRemove[0].vertex) &&
               (community.tile_index !== allOneAway[0].tile_index || community.vertex !== allOneAway[0].vertex) &&
               (community.tile_index !== allOneAway[1].tile_index || community.vertex !== allOneAway[1].vertex)
          );
        
          //increase level of the settlement
          current_game.gameboard.tiles[settlement.tile_index].community_spaces[settlement.vertex].level++;
          current_game.gameboard.tiles[settlement.tile_index].community_spaces[settlement.vertex].color = player.color; 

          //find neighbor(s)
          for(let i = -1; i < 1; i++) { 
               const neighbor_index = neighbors[settlement.tile_index as NeighborsKey][settlement.vertex + i]; // i is -1 and 0 need to get both neighbors
               if(neighbor_index > -1 ){
                    const neighbor_vertex = neighbors[neighbor_index as NeighborsKey].indexOf(settlement.tile_index) + (1 + i); // offset vertex's
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
     return getGamestate(sessionId);
}

/**
 * Helper function to find relative vertices at the same spot for the other two tiles given one tile. 
 */
function findRelativeNeighboringVertexFromVertex (community: community_meta_data){
     //given tile 5 vertex 3
     let tileOne = neighbors[community.tile_index as NeighborsKey][community.vertex - 1];
     let tileTwo = neighbors[community.tile_index as NeighborsKey][community.vertex];
     let returnCommuntiies : community_meta_data[] = []
     
     if(tileOne != -1){
          //for tile one find the edge that touches the origional tile
          let tileOneEdge = neighbors[tileOne as NeighborsKey].indexOf(community.tile_index);
          let tileOneEdgeTwo = neighbors[tileOne as NeighborsKey].indexOf(tileTwo);
          returnCommuntiies.push({
               tile_index: tileOne,
               vertex: vertexBetweenRoads(tileOneEdge, tileOneEdgeTwo) as community_keys //The max of any two edges will be their vertex inbetween
          })
     }

     if(tileTwo != -1){
          //for tile one find the edge that touches the origional tile
          let tileTwoEdge = neighbors[tileTwo as NeighborsKey].indexOf(community.tile_index);
          let tileTwoEdgeTwo = neighbors[tileTwo as NeighborsKey].indexOf(tileOne);
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
          gameboard: current_game.gameboard
     }

     return limited_state
     
}

type numberKey = keyof community_spaces

/**
     * Translates a number into a community space or road space's index.
     * @param toTranslate the index to translate to number key
     * @returns a number key that provides strong 0-5 typing to the index.
     */
function translateToNumberKey(toTranslate: number) {
     var translation: numberKey
     switch (toTranslate) {
         case 0:
             translation = 0;
             break;
         case 1:
             translation = 1;
             break;
         case 2: 
             translation = 2;
             break;
         case 3: 
             translation = 3;
             break;
         case 4: 
             translation = 4;
             break;
         case 5:
             translation = 5;
             break;
         default:
             throw new InvalidResourceError("Tried accessing an invalid index of a community space!")
     }
     return translation
 }

function getGamestate(sessionId: number) {
     updateResourceCounts(sessionId);
     checkWinState(sessionId)
     return translateToLimitedState(sessionId);
}

module.exports = { buyDevCard, handleDiceRoll, tradeWithBank, handleKnight, cancelSteal, passTurn, switchClient, buyRoad, buySettlement }