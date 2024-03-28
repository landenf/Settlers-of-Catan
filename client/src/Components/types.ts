import { Player, Tile, GameState } from "@backend/types";
import { Hex } from "react-hexgrid";

// NOTE: Please use this file for only frontend-specific types. If your type is also used in the backend, please
// add it here: server\src\types.ts

/**
 * An interface that provides strong typing to a list of players as a prop.
 */
export interface PlayerBarProp {
    /**
     * A list of players.
     */
    players: Player[];
}

/**
 * An interface that provides strong typing to a resource tile's hexagon prop.
 */
export interface HexProp {
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
 * An interface that provides strong typing to a game session's game state prop.
 */
export interface StateProp {
    /**
     * The current game session's state.
     */
    gamestate: GameState
}

/**
 * An interface that provides strong typing to a vp prop.
 */
export interface VPProp {

    /**
     * The current user's score of victory points.
     */
    vp: number
}

/**
 * An interface that provides strong typing to a resource card prop.
 */
export interface ResourceCardProp {

    /**
     * Represents the card's type (either resource type or dev card)
     */
    type: string;

    /**
     * Represents the count of the resource or dev card in hand.
     */
    value: number;
}

/**
 * An interface that provides strong typing to a gamestate passed to the action bar.
 */
export interface ActionsBarComponentProps {
    updateState: (newState: GameState) => void;
  }

/**
* An interface that provides strong typing to a gamestate passed to the roll
*/
export interface RollButtonProps {
    updateState: (newState: GameState) => void;
}