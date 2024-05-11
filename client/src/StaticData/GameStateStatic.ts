import { GameState, LimitedSession } from "@shared/types";
import { players } from "./PlayerData";
import { tiles } from "../StaticData/GameBoardStatic";

/**
 * A mocked gamestate that holds all possible information about all players.
 */
export const MockGameState: GameState = {
    id: 0,
    client: players[0],
    diceNumber: {
        number1: 1,
        number2: 1
    },
    players: players,
    winner: undefined,
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
 * A limited game state that holds less information about players other than
 * the client.
 */
export const MockLimitedGameState: LimitedSession = {
    id: 0,
    client: players[0],
    diceNumber: {
        number1: 1,
        number2: 1
    },
    players: players,
    current_player: players[0],
    gameboard: {
        tiles: []
    },
    isValid: false,
    canStart: false,
    isStarted: false,
    roundNumber: 1
}