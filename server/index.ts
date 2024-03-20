import { WebSocket } from 'ws';
import { GameState } from './src/types';

// This file cannot be used as a server as-is. To use it, compile it into javascript using "npx tsc index.ts".
// Then run "node index.js".

/**
 * The websocket which connects the backend to the frontend.
 */
let socket = null

/**
 * The user ID of the client connecting to this websocket.
 */
let id = null

/** 
 * establishes connection to the websocket server
 */ 
function connect() {
  socket = new WebSocket.Server({ port: 8080 });

  // handle changes when a client connects to the websocket
  socket.on('connection', (ws: WebSocket) => {

    // when a message is detected, handle the type of event
    ws.onmessage = (event) => {
      const eventData = event.data
      // TODO: Handle all different types of event, like dice rolling, resource
      // distribution, etc.

      // always send back the new game state to render 
      ws.send(JSON.stringify(mockGame))
  }
});

}

const mockGame: GameState = {
  players: [],
  current_player: {
    id: 0,
    name: '',
    image: '',
    color: '',
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
  current_largest_army: '',
  current_longest_road: '',
  gameboard: {
    tiles: []
  }
}