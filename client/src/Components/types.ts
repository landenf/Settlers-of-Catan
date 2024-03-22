import { Player, Tile, GameState } from "@backend/types";
import { Hex } from "react-hexgrid";

// NOTE: Please use this file for only frontend-specific types. If your type is also used in the backend, please
// add it here: server\src\types.ts

/**
 * A wrapper type that provides strong typing to a list of players as a prop.
 */
export type BarProp = {
    /**
     * A list of players.
     */
    players: Player[];
}

/**
 * A wrapper type that provides strong typing to a resource tile's hexagon prop.
 */
export type HexProp = {
    /**
     * A hexagon object representing this particular tile's placement on the grid.
     */
    hex: Hex;

    /**
     * The numbered index of this tile -- as in, its index placement on the grid.
     */
    index: number;

    /**
     * The backend information related to this hexagonal tile.
     */
    tile: Tile;
}

/**
 * A wrapper type that provides strong typing to a game session's game state prop.
 */
export type StateProp = {
    /**
     * The current game session's state.
     */
    gamestate: GameState
}

/**
 * A wrapper type that provides strong typing to a vp prop.
 */
export type VPProp = {
    vp: number
}