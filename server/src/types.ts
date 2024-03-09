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
     * A dictionary of resources cards currently held in the player's hand.
     */
    hand: resource_counts;

    /**
     * Total resources held by a player.
     */
    resources: number;

    /**
     * Dictionary representing each resource type gained when a particular
     * number is rolled.
     */
    resource_gain: {
        2: resource_counts;
        3: resource_counts;
        4: resource_counts;
        5: resource_counts;
        6: resource_counts;
        8: resource_counts;
        9: resource_counts;
        10: resource_counts;
        11: resource_counts;
        12: resource_counts;
    }

    /**
     * A list of communities held by the player. 
     */
    communities_owned: [];

    /**
     * A list of spots the player could build a community on.
     */
    potential_communities: [];
    
    /**
     * A list of roads held by the player.
     */
    roads_owned: [];

    /**
     * A list of spots the player could build a road on.
     */
    potential_roads: [];

    /**
     * A dictionary of this player's stats in all games.
     */
    player_stats: {
        /**
         * Registers total wins by this player.
         */
        "total_wins": number;

        /**
         * Registers total games ended where this player held the largest army card.
         */
        "largest_armies": number;

        /**
         * Registers total games ended where this player held the longest road card.
         */
        "most_roads": number;

        /**
         * Measures total victory points throughtout this player's games.
         */
        "total_vp": number;
    }
}

/**
 * Dictionary representing a count of each resource.
 */
export type resource_counts = {
    "wheat": number;
    "brick": number;
    "stone": number;
    "sheep": number;
    "wood": number;
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

