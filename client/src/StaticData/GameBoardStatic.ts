import { Tile } from "@shared/types";

const Tile_Resources: {[index: number]:any} = {
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

const Tile_Dice: {[index: number]:any} = {
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
}

const total_tiles = [...Array(19).keys()]

export const tiles: Tile[] = total_tiles.map((index) => (
  {
    community_spaces: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    road_spaces: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    number_roll: Tile_Dice[index],
    type: Tile_Resources[index]
  })
)
  
export const GameBoardConfiguration =  {
    "width": "100%",
    "height": "70vh",
    "layout": { "width": 9, "height": 9, "flat": false, "spacing": 1.02 },
    "origin": { "x": 0, "y": 0 },
    "map": "hexagon",
    "mapProps": [ 2 ]
  };