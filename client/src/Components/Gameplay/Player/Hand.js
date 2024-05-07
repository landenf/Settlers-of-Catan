"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ResourceCard_1 = __importDefault(require("./ResourceCard"));
require("../../../Styles/Gameplay/Player/Hand.css");
/**
 * Component that displays the amount of victory points a player has as well as
 * the numbers of all 5 resource cards and the number of development cards currently
 * in a player's hand
 *
 * @returns all cards in hand and victory points
 */
const Hand = (props) => {
    /**
     *get player resources
     */
    const hand = props.gamestate.client.hand;
    /**
     * the set of resources this player holds
     */
    let resources = [
        { name: "sheep", value: hand["sheep"] },
        { name: "wheat", value: hand["wheat"] },
        { name: "wood", value: hand["wood"] },
        { name: "brick", value: hand["brick"] },
        { name: "stone", value: hand["stone"] },
    ];
    return (react_1.default.createElement("div", { className: "personalCards" },
        resources.map((resource) => {
            return (react_1.default.createElement(ResourceCard_1.default, { key: resource.name, type: resource.name, value: resource.value }));
        }),
        react_1.default.createElement(ResourceCard_1.default, { type: "developmentCard", value: props.gamestate.client.knightCards })));
};
exports.default = Hand;
