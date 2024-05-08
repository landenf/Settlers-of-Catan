"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buySettlement = exports.buyRoad = exports.handleDiceRoll = void 0;
/**
 * Mocked backend function for handling the dice roll.
 */
const handleDiceRoll = (state) => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    state.diceNumber = { number1: dice1, number2: dice2 };
    return state;
};
exports.handleDiceRoll = handleDiceRoll;
/**
 * Mocked backend function for purchasing a road.
 */
const buyRoad = (state) => {
    const player = state.client;
    player.hand["brick"] = player.hand["brick"] - 1;
    player.hand["wood"] = player.hand["wood"] - 1;
    player.roads_owned.push({ tile_index: 1, edge: 1 });
    state.client = player;
    return state;
};
exports.buyRoad = buyRoad;
/**
 * Mocked backend function for purchasing a settlement.
 */
const buySettlement = (state) => {
    const player = state.client;
    player.hand["brick"] = player.hand["brick"] - 1;
    player.hand["wood"] = player.hand["wood"] - 1;
    player.hand["sheep"] = player.hand["sheep"] - 1;
    player.hand["wheat"] = player.hand["wheat"] - 1;
    player.potential_roads.push({ tile_index: 1, edge: 1 });
    state.client = player;
    return state;
};
exports.buySettlement = buySettlement;
