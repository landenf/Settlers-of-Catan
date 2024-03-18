import { GameState } from "@backend/types";
import { players } from "./PlayerData";
import { tiles } from "../StaticData/GameBoardStatic";

export const MockGameState: GameState = {
    players: players,
    winner: undefined,
    current_player: players[0],
    current_largest_army: "",
    current_longest_road: "",
    gameboard: {
        tiles: tiles
    }
}