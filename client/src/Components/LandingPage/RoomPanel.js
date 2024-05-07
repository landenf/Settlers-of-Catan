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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../../Styles/LandingAuth/JoinRoomWithCode.css");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
/**
 * Panel that lets the player see the other players in the lobby and ready up
 * to play a match.
 */
const RoomPanel = ({ state, callBackend, setRoomPanel, setButtonsActive }) => {
    const [ready, setReady] = (0, react_1.useState)(false);
    const players = state.players;
    /**
     * Function used whenever the user presses the "leave" button. Sends
     * a backend call to leave the game.
     */
    const leaveGame = () => {
        const request = {
            state: state
        };
        callBackend("leaveGame", request);
        setButtonsActive(true);
        setRoomPanel(false);
        setReady(false);
    };
    /**
     * Handles the action of clicking the ready button. Should
     * ready up the player and un-ready them depending on when
     * it's clicked.
     */
    const handleReady = () => {
        const request = {
            state: state
        };
        callBackend("handleReady", request);
        setReady(!ready);
    };
    return (react_1.default.createElement("div", { className: "join-room-with-code" },
        react_1.default.createElement("div", { className: "header-box" },
            react_1.default.createElement("p", { className: "header-text" },
                " ROOM: ",
                state.id)),
        react_1.default.createElement("div", { className: ("main-content-box") },
            players.map((player) => {
                const color = player.color === "red" ? "Red" :
                    player.color === "blue" ? "Blue" :
                        player.color === "orange" ? "Orange" :
                            "Green";
                return (react_1.default.createElement("div", { className: "lobby-players", key: player.color },
                    react_1.default.createElement("div", { className: "player-color-banner banner-" + (player.color) }, color),
                    react_1.default.createElement("p", { className: "players-in-room" },
                        "P",
                        players.indexOf(player) + 1,
                        ": ",
                        player.name,
                        (!player.ready && react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faBan, className: "icon-not-ready" })),
                        (player.ready && react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCheck, className: "icon-ready" })))));
            }),
            react_1.default.createElement("div", { className: "buttons" },
                react_1.default.createElement("button", { className: "leave-button", onClick: () => leaveGame() }, "Leave"),
                react_1.default.createElement("button", { className: "ready-button " + (ready ? "ready" : "not-ready"), onClick: () => handleReady() }, "Ready" + (ready ? "!" : "?"))))));
};
exports.default = RoomPanel;
