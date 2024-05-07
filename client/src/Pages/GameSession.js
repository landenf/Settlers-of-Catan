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
const GameBoard_1 = __importDefault(require("../Components/Gameplay/Gameboard/GameBoard"));
const PlayerBarComponent_1 = __importDefault(require("../Components/Gameplay/Player/PlayerBarComponent"));
const ActionsBarComponent_1 = __importDefault(require("../Components/Gameplay/Menus/ActionsBarComponent"));
const InitialPlacementMenuComponent_1 = __importDefault(require("../Components/Gameplay/Menus/InitialPlacementMenuComponent"));
const Hand_1 = __importDefault(require("../Components/Gameplay/Player/Hand"));
const victoryPointsComponent_1 = __importDefault(require("../Components/Gameplay/Player/victoryPointsComponent"));
const react_1 = __importStar(require("react"));
const GameBoardStatic_1 = require("../StaticData/GameBoardStatic");
require("../Styles/Gameplay/GameSession.css");
const RollButton_1 = __importDefault(require("../Components/Gameplay/Gameboard/RollButton"));
const TradeModal_1 = __importDefault(require("../Components/Gameplay/Menus/TradeModal"));
const StealModal_1 = __importDefault(require("../Components/Gameplay/Menus/StealModal"));
const Dice_1 = __importDefault(require("../Components/Gameplay/Gameboard/Dice"));
const EndGameModal_1 = __importDefault(require("../Components/Gameplay/Menus/EndGameModal"));
const GameSession = ({ state, backend, setState }) => {
    const [tradeModalEnabled, setTradeModal] = (0, react_1.useState)(false);
    const [stealModalEnabled, setStealModal] = (0, react_1.useState)(false);
    const [endGameModalEnabled, setEndGameModal] = (0, react_1.useState)(false);
    const [showPotenialBuildOptions, setshowPotenialBuildOptions] = (0, react_1.useState)({ roads: false, settlements: false });
    const [rolled, setRolled] = (0, react_1.useState)(false);
    const [boughtDev, setBoughtDev] = (0, react_1.useState)(false);
    const [isCurrentPlayer, setCurrentPlayer] = (0, react_1.useState)(state.client.color === state.current_player.color);
    const updateState = (newState) => {
        setState(newState);
    };
    const updateTradeModal = (newState) => {
        setTradeModal(newState);
    };
    const updateStealModal = (newState) => {
        setStealModal(newState);
    };
    const updatePotentialSettlements = (selected) => {
        if (selected === 'settlements') {
            setshowPotenialBuildOptions(prevState => ({
                roads: false,
                settlements: !prevState.settlements // Toggle settlements
            }));
        }
        else if (selected === 'roads') {
            setshowPotenialBuildOptions(prevState => ({
                roads: !prevState.roads, // Toggle roads
                settlements: false
            }));
        }
    };
    const updateRolled = (newState) => {
        setRolled(newState);
    };
    const updateBoughtDev = (newState) => {
        setBoughtDev(newState);
    };
    const websocket = backend;
    /**
     * Resets the action bar and roll button.
     */
    const resetTurn = () => {
        setRolled(false);
        setBoughtDev(false);
    };
    /**
     * Used to update the rendering of the client's screen when we
     * receive the gamestate from the backend.
     */
    websocket.addEventListener("message", (msg) => {
        const newState = JSON.parse(msg.data);
        updateState(newState);
        if (newState.client.hasKnight) {
            setStealModal(true);
        }
        if (newState.winner) {
            setEndGameModal(true);
        }
        setCurrentPlayer(newState.client.color === newState.current_player.color);
    });
    /**
     * Uses the websocket to send information to the backend and
     * retrieve the current game session.
     * @param type the "endpoint" to hit (/roll or /buyDevCard for example)
     * @param body any payload information to send to the backend
     */
    const callBackend = (type, body) => {
        const message = {
            endpoint: type,
            body: body
        };
        backend.send(JSON.stringify(message));
        if (type === "buyDevCard") {
            updateBoughtDev(true);
        }
        if (type === "passTurn") {
            resetTurn();
        }
    };
    /**
     * Chooses only players that are not the client to render
     * on the side component.
     */
    const players_to_render = [];
    state.players.forEach(player => {
        if (player.color != state.client.color) {
            players_to_render.push(player);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TradeModal_1.default, { setTradeModal: updateTradeModal, tradeModalState: tradeModalEnabled, gamestate: state, callBackend: callBackend }),
        react_1.default.createElement(StealModal_1.default, { setStealModal: updateStealModal, stealModalState: stealModalEnabled, gamestate: state, callBackend: callBackend }),
        endGameModalEnabled && react_1.default.createElement(EndGameModal_1.default, { setEndGameModal: setEndGameModal, endGameModalState: endGameModalEnabled, gamestate: state, callBackend: callBackend }),
        react_1.default.createElement("div", { className: "background-container" },
            react_1.default.createElement("div", { className: "game-container " + (tradeModalEnabled || stealModalEnabled ? "in-background" : "") },
                react_1.default.createElement("div", { className: "PlayerbarComponent" },
                    react_1.default.createElement(PlayerBarComponent_1.default, { players: players_to_render })),
                react_1.default.createElement("div", { className: "center-column" },
                    react_1.default.createElement("div", { className: "game-board" },
                        react_1.default.createElement(Dice_1.default, { numberRolled: state.diceNumber }),
                        react_1.default.createElement(GameBoard_1.default, { tiles: GameBoardStatic_1.tiles, gamestate: state, updateState: updateState, showPotenialBuildOptions: showPotenialBuildOptions, callBackend: callBackend })),
                    react_1.default.createElement("div", { className: "user-info" },
                        react_1.default.createElement(victoryPointsComponent_1.default, { vp: state.client.vp }),
                        react_1.default.createElement(Hand_1.default, { gamestate: state }),
                        react_1.default.createElement(RollButton_1.default, { callBackend: callBackend, state: state, rolled: rolled, updateRolled: updateRolled, isCurrentPlayer: isCurrentPlayer }))),
                react_1.default.createElement("div", { className: "ActionsBarComponent" },
                    react_1.default.createElement(ActionsBarComponent_1.default, { state: state, callBackend: callBackend, setTradeModal: updateTradeModal, boughtDev: boughtDev, isCurrentPlayer: isCurrentPlayer, updatePotentialSettlements: updatePotentialSettlements })),
                react_1.default.createElement("div", { className: "InitialRoundMenuComponent" },
                    react_1.default.createElement(InitialPlacementMenuComponent_1.default, { state: state, callBackend: callBackend, isCurrentPlayer: isCurrentPlayer, updatePotentialSettlements: updatePotentialSettlements }))))));
};
exports.default = GameSession;
