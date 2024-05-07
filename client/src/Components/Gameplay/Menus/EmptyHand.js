"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../../../Styles/Gameplay/Player/Hand.css");
const EmptyResourceCard_1 = __importDefault(require("./EmptyResourceCard"));
/**
 * Component that displays the amount of victory points a player has as well as
 * the numbers of all 5 resource cards and the number of development cards currently
 * in a player's hand
 *
 * @returns all cards in hand and victory points
 */
const EmptyHand = ({ gamestate, tradeParameters, setTradeParams, tradeType, setTradeEmpty, tradeEmpty }) => {
    /**
     *get player resources
     */
    const hand = gamestate.client.hand;
    /**
     * the set of resources this player holds
     */
    let resources = [
        { name: "sheep" },
        { name: "wheat" },
        { name: "wood" },
        { name: "brick" },
        { name: "stone" },
    ];
    const [cardIsSelected, setCardIsSelected] = (0, react_1.useState)(false);
    /**
     * Lets the parent element know that a card has been selected so that
     * multiple cards aren't selected from the same row of resources.
     * @param newState number representing the amount of fields filled out in
     * the modal
     */
    const updateCardIsSelected = (newState) => {
        setCardIsSelected(newState);
        if (cardIsSelected) {
            setTradeEmpty(--tradeEmpty);
        }
        else {
            setTradeEmpty(++tradeEmpty);
        }
    };
    return (react_1.default.createElement("div", { className: "displayCards" }, resources.map((resource) => {
        return react_1.default.createElement(EmptyResourceCard_1.default, { key: resource.name, type: resource.name, cardIsSelected: cardIsSelected, setCardIsSelected: updateCardIsSelected, setTradeParams: setTradeParams, tradeType: tradeType, tradeParameters: tradeParameters });
    })));
};
exports.default = EmptyHand;
