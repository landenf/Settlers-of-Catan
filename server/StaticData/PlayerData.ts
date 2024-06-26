const road_one = {
    tile_index: 6,
    edge: 5,
};

const road_two = {
    tile_index: 5,
    edge: 2,
};

import { GameState, Player, road_meta_data } from "@shared/types";
    const player1: Player = {
        id: "0",
        name: "steven",
        image: "empty-avatar",
        color: "red",
        vp: 1,
        resources: 1000,
        hand: {
            wheat: 200,
            brick: 200,
            stone: 200,
            sheep: 200,
            wood: 200
        },
        communities_owned: [],
        potential_communities: [],
        roads_owned: [],
        potential_roads: [],
        player_stats: {
            total_wins: 0,
            largest_armies: 0,
            most_roads: 0,
            total_vp: 0
        },
        resource_gain: {
            2: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            3: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            4: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            5: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            6: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            8: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            9: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            10: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            11: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            12: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            }
        },
        hasKnight: false,
        knightCards: 0,
        hasLargestArmy: false,
        hasMostRoads: false,
        ready: false
    };
    const player2: Player = {
        id: "0",
        name: "steve",
        image: "empty-avatar",
        color: "orange",
        vp: 7,
        resources: 22,
        hand: {
            wheat: 4,
            brick: 5,
            stone: 6,
            sheep: 4,
            wood: 3
        },
        communities_owned: [],
        potential_communities: [],
        roads_owned: [],
        potential_roads: [],
        player_stats: {
            total_wins: 0,
            largest_armies: 0,
            most_roads: 0,
            total_vp: 0
        },
        resource_gain: {
            2: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            3: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            4: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            5: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            6: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            8: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            9: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            10: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            11: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            12: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            }
        },
        hasKnight: false,
        knightCards: 0,
        hasLargestArmy: false,
        hasMostRoads: false,
        ready: false
    };
    const player3: Player = {
        id: "0",
        name: "stevie",
        image: "empty-avatar",
        color: "green",
        vp: 7,
        resources: 52,
        hand: {
            wheat: 5,
            brick: 8,
            stone: 16,
            sheep: 20,
            wood: 3
        },
        communities_owned: [],
        potential_communities: [],
        roads_owned: [],
        potential_roads: [],
        player_stats: {
            total_wins: 0,
            largest_armies: 0,
            most_roads: 0,
            total_vp: 0
        },
        resource_gain: {
            2: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            3: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            4: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            5: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            6: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            8: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            9: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            10: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            11: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            },
            12: {
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            }
        },
        hasKnight: false,
        hasLargestArmy: false,
        hasMostRoads: false,
        knightCards: 0,
        ready: false
    };
    export const players = [player1, player2, player3]