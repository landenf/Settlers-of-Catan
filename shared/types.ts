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
    communities_owned: [community_spaces];

    /**
     * A list of spots the player could build a community on.
     */
    potential_communities: [community_spaces];
    
    /**
     * A list of roads held by the player.
     */
    roads_owned: [road_spaces];

    /**
     * A list of spots the player could build a road on.
     */
    potential_roads: [road_spaces];

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
     * The count of this card. It counts total resources or total development cards.
     */
    value: number;
}

/**
 * Represents a single hexagonal tile on the gameboard.
 */
export type Tile = {
    /**
     * A list of spaces on a tile where communities are built or
     * are already built.
     */
    community_spaces: community_spaces;

    /**
     * A list of spaces on a tile where roads are built or are 
     * already built.
     */
    road_spaces: road_spaces;

    /**
     * The number which provides resources from this tile.
     */
    number_roll: number;

    /**
     * The type of resource this tile represents.
     */
    type: string;
}

/**
 * A list of spaces on a tile where communities are built or
 * are already built. The first number represents the space:
 * the second number represents the ownership.
 * On each space, 0 = unbuilt, 1 = player 1 ownership, etc.
 */
export type community_spaces = {
    /** top-left vertex */
    "0": 0
    /** top-right vertex */
    "1": 0
    /** mid-right vertex */
    "2": 0
    /** bottom-right vertex*/
    "3": 0
    /** bottom-left vertex */
    "4": 0
    /** mid-left vertex */
    "5": 0
}

/**
 * A list of spaces on a tile where roads are built or are already 
 * built. The first number represents the space: the second number 
 * represents the ownership. On each space, 0 = unbuilt, 
 * 1 = player 1 ownership, etc.
 */
export type road_spaces = {
    /** top edge */
    "0": 0
    /** top-right edge */
    "1": 0
    /** bottom-right edge */
    "2": 0
    /** bottom edge*/
    "3": 0
    /** bottom-left edge */
    "4": 0
    /** top-left edge */
    "5": 0
}

/**
 * Represents a gameboard consisting of several hexagonal tiles.
 */
export type Board = {
    /**
     * A list of tiles that build the gameboard.
     */
    tiles: Tile[]
}

/**
 * Represents the game session's current state.
 */
export type GameState = {
    /**
     * The latest roll of the dice. This will be the two numbers added together;
     */
    diceNumber: number;

    /**
     * A list of players who are in this current game session.
     */
    players: Player[]

    /**
     * The winner of this game. If there is no winner, it is set to undefined.
     */
    winner?: Player

    /**
     * The player who is currently playing through their turn.
     */
    current_player: Player

    /**
     * The player who currently holds the largest army card.
     */
    current_largest_army: string

    /**
     * The player who currently holds the longest road card.
     */
    current_longest_road: string

    /**
     * The current gameboard with its representations of player buildings
     * and resource tiles.
     */
    gameboard: Board
}