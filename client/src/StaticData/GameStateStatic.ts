import { GameState } from "@shared/types";
import { players } from "./PlayerData";
import { tiles } from "@shared/StaticBoardData";

export const MockGameState: GameState = {
    diceNumber: 0,
    players: players,
    winner: undefined,
    current_player: players[0],
    current_largest_army: "",
    current_longest_road: "",
    gameboard: {
        tiles: tiles
    }
}