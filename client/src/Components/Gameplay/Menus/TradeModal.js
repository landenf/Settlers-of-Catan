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
require("../../../Styles/Gameplay/Menus/TradeModal.css");
const EmptyHand_1 = __importDefault(require("./EmptyHand"));
/**
 * A modal that pops out when trading. TODO: Work to include this with other forms of trading
 * besides the bank!
 */
const TradeModalComponent = ({ setTradeModal, tradeModalState, gamestate, callBackend }) => {
    const [trade, setTrade] = (0, react_1.useState)({ offer: "", gain: "" });
    const [tradeEmpty, setTradeEmpty] = (0, react_1.useState)(0);
    const updateTrade = (newParams) => {
        setTrade(newParams);
    };
    const updateTradeEmpty = (newState) => {
        setTradeEmpty(newState);
    };
    /**
     * Sets the new trade parameters, given the card type.
     */
    const handleButtonClick = () => {
        const body = {
            resourceOffered: trade.offer,
            resourceGained: trade.gain,
            state: gamestate
        };
        callBackend("tradeBank", body);
    };
    return (react_1.default.createElement("div", { className: "trade-modal " + (tradeModalState ? "" : "disabled") },
        react_1.default.createElement("div", { className: "header" }, "TRADE"),
        react_1.default.createElement("div", { className: "description" }, "Please select a resource to trade from your hand:"),
        react_1.default.createElement(EmptyHand_1.default, { gamestate: gamestate, setTradeParams: updateTrade, tradeType: "offer", tradeParameters: trade, setTradeEmpty: updateTradeEmpty, tradeEmpty: tradeEmpty }),
        react_1.default.createElement("div", { className: "description" }, "Please select a resource to receive:"),
        react_1.default.createElement(EmptyHand_1.default, { gamestate: gamestate, setTradeParams: updateTrade, tradeType: "gain", tradeParameters: trade, setTradeEmpty: updateTradeEmpty, tradeEmpty: tradeEmpty }),
        react_1.default.createElement("div", { className: "tradeButtons" },
            react_1.default.createElement("button", { className: "cancelTrade", onClick: () => setTradeModal(false) }, "Cancel"),
            react_1.default.createElement("button", { className: "affirmTrade " + (tradeEmpty != 2 ? "dark" : ""), disabled: tradeEmpty != 2, onClick: () => handleButtonClick() }, "Let's Trade!"))));
};
exports.default = TradeModalComponent;
