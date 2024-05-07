"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLimitedGameState = exports.MockGameState = void 0;
const PlayerData_1 = require("./PlayerData");
const GameBoardStatic_1 = require("../StaticData/GameBoardStatic");
exports.MockGameState = {
    id: 0,
    client: PlayerData_1.players[0],
    diceNumber: {
        number1: 1,
        number2: 1
    },
    players: PlayerData_1.players,
    winner: undefined,
    current_player: PlayerData_1.players[0],
    gameboard: {
        tiles: GameBoardStatic_1.tiles
    },
    isValid: false,
    canStart: false,
    isStarted: false,
    roundNumber: 1
};
exports.MockLimitedGameState = {
    id: 0,
    client: PlayerData_1.players[0],
    diceNumber: {
        number1: 1,
        number2: 1
    },
    players: PlayerData_1.players,
    current_player: PlayerData_1.players[0],
    gameboard: {
        tiles: []
    },
    isValid: false,
    canStart: false,
    isStarted: false,
    roundNumber: 1
};
