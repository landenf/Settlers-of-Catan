// NOTE: Please use this file only to add types that are shared between the frontend and backend.
// Please add all front-end specific files to: client\src\Components\types.ts.

/**
 * A player (user) of Catan.
 */
export type Player = {

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
     * The player's in-game color.
     */
    color: string;

    /**
     * The player's total count of victory points.
     */
    vp: number;

    /**
     * A dictionary of resource values currently held by the player.
     */
    resources: {
        "wheat": 0
        "brick": 0
        "stone": 0
        "sheep": 0
        "wood": 0
    };

    /**
     * A list of communities held by the player. 
     */
    communities_owned: []

    /**
     * A list of spots the player could build a community on.
     */
    potential_communities: []
    
    /**
     * A list of roads held by the player.
     */
    roads_owned: []

    /**
     * A list of spots the player could build a road on.
     */
    potential_roads: []

    /**
     * A dictionary of this player's stats in all games.
     */
    player_stats: {

    }
}

/**
 * Represents a resource or development card.
 */
export type Card = {
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

