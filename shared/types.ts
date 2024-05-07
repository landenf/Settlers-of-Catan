// NOTE: Please use this file only to add types that are shared between the frontend and backend.
// Please add all front-end specific files to: client\src\Components\types.ts.

/**
 * A player (user) of Catan.
 */
export type Player = {

    /**
     * A unique user ID.
     */
    id: string;

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
     * Whether this player has the largest army.
     */
    hasLargestArmy: boolean;


    /**
    * Whether this player has most roads.
    */
    hasMostRoads: boolean;

    /**
     * A dictionary of resources cards currently held in the player's hand.
     */
    hand: resource_counts;

    /**
     * If a player just drew a knight card, this becomes true. This lets the
     * player steal a resource card from another player.
     */
    hasKnight: boolean;

    /**
     * Total resources held by a player.
     */
    resources: number;

    /**
     * Total knights played by a player.
     */
    knightCards: number;

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
    communities_owned: community_meta_data[];

    /**
     * A list of spots the player could build a community on.
     */
    potential_communities: community_meta_data[];
    
    /**
     * A list of roads held by the player.
     */
    roads_owned: road_meta_data[];

    /**
     * A list of spots the player could build a road on.
     */
    potential_roads: road_meta_data[];

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

    /**
     * Used only in the lobby: lets the server know this player is
     * ready to start the game.
     */
    ready: boolean;
}

/**
 * A player with limited information. Used to render necessary player information
 * in the frontend.
 */
export type LimitedPlayer = {
    
    /**
     * A unique user ID.
     */
    id: string;

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
     * Whether this player has the largest army.
     */
        hasLargestArmy: boolean;


    /**
    * Whether this player has most roads.
    */
    hasMostRoads: boolean;

    /**
     * Total resources held by a player.
     */
    resources: number;

    /**
     * Used only in the lobby: lets the server know this player is
     * ready to start the game.
     */
    ready: boolean;
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

export type community_spaces_data = {
    /**
    * A number corresponding to the community level.
    */
       level: number;

       /**
        * A color associate with the player.
        */
       color: string;
} 

/**
 * A list of spaces on a tile where communities are built or
 * are already built. The first number represents the space:
 * the second number represents the ownership.
 * On each space, 0 = unbuilt, 1 = player 1 ownership, etc.
 */
export type community_spaces = {
    /** top-left vertex */
    0: community_spaces_data
    /** top-right vertex */
    1: community_spaces_data
    /** mid-right vertex */
    2: community_spaces_data
    /** bottom-right vertex*/
    3: community_spaces_data
    /** bottom-left vertex */
    4: community_spaces_data
    /** mid-left vertex */
    5: community_spaces_data
}

/**
 * Key for the community_spaces dictionary.
 */
export type community_keys = keyof community_spaces;

/**
 * Meta data about the community
 */
export type community_meta_data = {
    /**
     * A number corresponding to the tile's index.
     */
    tile_index: number;

    /**
     * A number that corresponds to which vertex it is on to.
     */
    vertex: community_keys;

}


/**
 * A list of spaces on a tile where roads are built or are already 
 * built. The first number represents the space: the second number 
 * represents the ownership. On each space, 0 = unbuilt, 
 * any other number will correspond with the player's id.
 */
export type road_spaces = {
    /** top edge */
    0: string;
    /** top-right edge */
    1: string;
    /** bottom-right edge */
    2: string;
    /** bottom edge*/
    3: string;
    /** bottom-left edge */
    4: string;
    /** top-left edge */
    5: string;
};

/**
 * Key for the road_spaces dictionary.
 */
export type road_keys = keyof road_spaces;

/**
 * Meta data that tells you which road and tile it corresponds to.
 */
export type road_meta_data = {
    /**
     * A number corresponding to one of the tile's index.
     */
    tile_index: number;

    /**
    * A number that corresponds to which edge it connects to on the first tile.
    */
    edge: road_keys;

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
     * The game session ID. This marks which game session the players are
     * playing in. This is decided before the game starts and shouldn't
     * change throughout it.
     */
    id: number;

    /**
     * The user of this particular instance. Each client has a unique screen
     * showing off their hand and victory points. 
     */
    client: Player;

    /**
     * The latest roll of the dice.
     */
    diceNumber: {
        number1: number;
        number2: number;
    };

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
    current_largest_army?: Player

    /**
     * The player who currently holds the longest road card.
     */
    current_longest_road?: Player

    /**
     * The current gameboard with its representations of player buildings
     * and resource tiles.
     */
    gameboard: Board

    /**
     * Flag set to true as long as this gamestate is valid and players can 
     * play in the session.
     */
    isValid: boolean;

    /**
     * Flag set to true once all players have readied up.
     */
    canStart: boolean;

    /**
     * Flag set once the game has started.
     */
    isStarted: boolean;

    /**
     * The number for which round we are currently on in the game.
     */
    roundNumber: number;
}

/**
 * A game session with limited information. It helps to limit information
 * leaks if we pass that information to the frontend using this limited type.
 */
export type LimitedSession = {
    /**
     * The game session ID. This marks which game session the players are
     * playing in. This is decided before the game starts and shouldn't
     * change throughout it.
     */
    id: number;

    /**
     * The user of this particular instance. Each client has a unique screen
     * showing off their hand and victory points. 
     */
    client: Player;

    /**
     * The latest roll of the dice.
     */
    diceNumber: {
        number1: number;
        number2: number;
    };

    /**
     * A list of players who are in this current game session.
     */
    players: LimitedPlayer[]

    /**
     * The winner of this game. If there is no winner, it is set to undefined.
     */
    winner?: LimitedPlayer

    /**
     * The player who is currently playing through their turn.
     */
    current_player: LimitedPlayer

    /**
     * The player who currently holds the largest army card.
     */
    current_largest_army?: LimitedPlayer

    /**
     * The player who currently holds the longest road card.
     */
    current_longest_road?: LimitedPlayer

    /**
     * The current gameboard with its representations of player buildings
     * and resource tiles.
     */
    gameboard: Board

    /**
     * Determines if this gamestate is valid and can be manipulated by players.
     */
    isValid: boolean;

    /**
     * Flag set to true once all players have readied up.
     */
    canStart: boolean;

    /**
     * Flag set once the game has started.
     */
    isStarted: boolean;


    /**
     * The number for which round we are currently on in the game.
     */
    roundNumber: number;
}