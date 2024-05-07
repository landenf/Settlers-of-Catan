"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameBoardConfiguration = exports.tiles = void 0;
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
        0: { level: 0, color: 'white' },
        1: { level: 0, color: 'white' },
        2: { level: 0, color: 'white' },
        3: { level: 0, color: 'white' },
        4: { level: 0, color: 'white' },
        5: { level: 0, color: 'white' }
    },
    road_spaces: {
        0: "white",
        1: "white",
        2: "white",
        3: "white",
        4: "white",
        5: "white"
    },
    number_roll: Tile_Dice[index],
    type: Tile_Resources[index]
}));
exports.GameBoardConfiguration = {
    "width": "100%",
    "height": "70vh",
    "layout": { "width": 9, "height": 9, "flat": false, "spacing": 1.1 },
    "origin": { "x": 0, "y": 0 },
    "map": "hexagon",
    "mapProps": [2]
};
