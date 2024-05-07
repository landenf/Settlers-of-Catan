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
const MenuButtonComponent_1 = __importDefault(require("./MenuButtonComponent"));
require("../../Styles/LandingAuth/MenuOptions.css");
/**
 * Creates all of the buttons that the landing page
 * will toggle between.
 *
 * @returns All menu button options.
 */
const MenuToggleComponent = ({ callBackend, state, setRoomPanel, buttonsActive, setButtonsActive }) => {
    const [showStartGame, setShowStartGame] = (0, react_1.useState)(false);
    const [canStart, setCanStart] = (0, react_1.useState)(false);
    /* Toggle Button Themes */
    const theme1 = { color: "#FFFFFF", text: "CREATE ROOM", backendCall: "generateGame" };
    const theme2 = { color: "#F7C84F", text: "JOIN ONLINE ROOM", backendCall: "joinRandomGame" };
    const theme3 = { color: "#CBCBCB", text: "USE JOIN CODE", backendCall: "joinGameByID" };
    const themes = [theme1, theme2, theme3];
    (0, react_1.useEffect)(() => {
        if (state.client.color == "red" && state.isValid) {
            setShowStartGame(true);
        }
        else {
            setShowStartGame(false);
        }
        setCanStart(state.canStart);
    });
    const handleGameStart = () => {
        const request = {
            state: state
        };
        callBackend("startGame", request);
    };
    return (react_1.default.createElement("div", { className: ("toggleButtonContainer ") + (showStartGame ? "toggleButtonContainerFourButtons" : "") },
        themes.map((type) => {
            return react_1.default.createElement(MenuButtonComponent_1.default, { key: type.color, color: type.color, text: type.text, callBackend: callBackend, state: state, setRoomPanel: setRoomPanel, backendCall: type.backendCall, buttonsActive: buttonsActive, setButtonsActive: setButtonsActive });
        }),
        showStartGame && (react_1.default.createElement("button", { className: "start-game-button " + (canStart ? "" : "cannot-start"), onClick: () => handleGameStart(), disabled: !canStart }, "Start Game!"))));
};
exports.default = MenuToggleComponent;
