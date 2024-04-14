"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiles = void 0;
const Tile_Resources = {
    0: "wheat",
    1: "wood",
    2: "brick",
    3: "wheat",
    4: "wood",
    5: "stone",
    6: "wood",
    7: "stone",
    8: "brick",
    9: "Desert",
    10: "wheat",
    11: "sheep",
    12: "sheep",
    13: "sheep",
    14: "wood",
    15: "sheep",
    16: "wood",
    17: "brick",
    18: "stone",
};
const Tile_Dice = {
    0: 9,
    1: 8,
    2: 5,
    3: 12,
    4: 11,
    5: 3,
    6: 6,
    7: 10,
    8: 6,
    9: 0,
    10: 4,
    11: 11,
    12: 2,
    13: 4,
    14: 3,
    15: 5,
    16: 9,
    17: 10,
    18: 8,
};
const total_tiles = [...Array(19).keys()];
exports.tiles = total_tiles.map((index) => ({
    community_spaces: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    },
    road_spaces: {
        0: "grey",
        1: "grey",
        2: "grey",
        3: "grey",
        4: "grey",
        5: "grey"
    },
    number_roll: Tile_Dice[index],
    type: Tile_Resources[index]
}));