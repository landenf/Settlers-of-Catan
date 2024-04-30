import { GameState, LimitedSession } from "@shared/types";
import { players } from "./PlayerData";
import { tiles } from "../StaticData/GameBoardStatic";

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
    current_largest_army: "",
    current_longest_road: "",
    gameboard: {
        tiles: tiles
    }
}

export const MockLimitedGameState: LimitedSession = {
    id: 0,
    client: players[0],
    diceNumber: {
        number1: 1,
        number2: 1
    },
    players: players,
    current_player: players[0],
    current_largest_army: "",
    current_longest_road: "",
    gameboard: {
        tiles: []
    }
}