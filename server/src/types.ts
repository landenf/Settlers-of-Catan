// NOTE: Please use this file only to add types that are shared between the frontend and backend.
// Please add all front-end specific files to: client\src\Components\types.ts.

/**
 * A player (user) of Catan.
 */
export interface Player {

    /**
     * A unique user ID.
     */
    id: number;

    /**
     * The player's screen name.
     */
    name: string;

    /**
     * The player's avatar URL. TODO: Connect to a database of user images.
     */
    image: string;

    /**
     * The player's in-game color, to be displayed as a border on their 
     * avatar.
     */
    color: string;

    /**
     * The player's total count of victory points.
     */
    vp: number;

    /**
     * The player's total count of resources.
     */
    resources: number;
}

/**
 * Represents a resource or development card.
 */
export interface Card {
    /**
     * The card's type, whether it be a resource type (think ore, wood, sheep, etc.) 
     * or a development type (think knight, monopoly, etc.)
     */
    type: string;

    /**
     * The "count" so to speak of this card. It counts total resources or total development
     * cards.
     */
    value: number;
}

