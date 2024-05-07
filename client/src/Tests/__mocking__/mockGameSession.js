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
const RollButton_1 = __importDefault(require("../../Components/Gameplay/Gameboard/RollButton"));
const GameStateStatic_1 = require("../../StaticData/GameStateStatic");
const ActionsBarComponent_1 = __importDefault(require("../../Components/Gameplay/Menus/ActionsBarComponent"));
const mockBackend_1 = require("./mockBackend");
var state = GameStateStatic_1.MockLimitedGameState;
const MockGameSession = (props) => {
    const [rolled, setRolled] = (0, react_1.useState)(false);
    const [tradeModalEnabled, setTradeModal] = (0, react_1.useState)(false);
    const [boughtDev, setBoughtDev] = (0, react_1.useState)(false);
    const [buyingRoad, setBuyingRoad] = (0, react_1.useState)(false);
    const [buyingSettlement, setBuyingSettlement] = (0, react_1.useState)(false);
    const [state, setState] = (0, react_1.useState)(props.state);
    const [isCurrentPlayer, setCurrentPlayer] = (0, react_1.useState)(state.client.color === state.current_player.color);
    const [selected, setSelected] = (0, react_1.useState)("");
    const callBackend = (action, request) => {
        if (action === "roll") {
            setState((0, mockBackend_1.handleDiceRoll)(request.state));
        }
        if (action === "buyDevCard") {
            setBoughtDev(true);
        }
        if (action === "buildRoad") {
            setState((0, mockBackend_1.buyRoad)(request.state));
            setBuyingRoad(true);
        }
        if (action === "buildSettlement") {
            setState((0, mockBackend_1.buySettlement)(request.state));
            setBuyingSettlement(true);
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { "aria-label": "test-gameboard ", className: (buyingRoad ? "road-found " : " ") +
                (buyingSettlement ? "settlement-found" : "") }),
        react_1.default.createElement("div", { "aria-label": "test-trade-modal", className: (tradeModalEnabled ? "tradeModalOn" : "tradeModalOff") }),
        react_1.default.createElement(RollButton_1.default, { callBackend: callBackend, state: props.state, rolled: rolled, updateRolled: setRolled, isCurrentPlayer: isCurrentPlayer }),
        react_1.default.createElement(ActionsBarComponent_1.default, { state: state, callBackend: callBackend, setTradeModal: setTradeModal, boughtDev: boughtDev, isCurrentPlayer: isCurrentPlayer, updatePotentialSettlements: setSelected })));
};
exports.default = MockGameSession;
