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
require("../../../Styles/Gameplay/Menus/StealModal.css");
require("../../../Styles/Gameplay/Player/PlayerComponent.css");
const AvatarComponent_1 = __importDefault(require("../Player/AvatarComponent"));
/**
 * Component used to ask the player who they want to steal resources from.
 * Activated when the player receives a knight card.
 */
const StealModal = ({ stealModalState, setStealModal, gamestate, callBackend }) => {
    const [isSelected, updateSelection] = (0, react_1.useState)(false);
    const [playerSelected, updatePlayerSelection] = (0, react_1.useState)("");
    /**
     * Function to sort through the gamestate to find the player that matches
     * the given color.
     * @param color the unique color of the player to search
     */
    const locatePlayerIndexByColor = (color) => {
        let playerIndex = 0;
        for (let i = 0; i < gamestate.players.length; i++) {
            if (color === gamestate.players[i].color) {
                playerIndex = i;
            }
        }
        return playerIndex;
    };
    /**
     * Cancels the stealing portion of the card. Forfeits the
     * player's abiilty to steal.
     */
    const cancel_steal = () => {
        updateSelection(false);
        updatePlayerSelection("");
        callBackend("cancelSteal", { state: gamestate });
        setStealModal(false);
    };
    /**
     * Function used to call the backend and handle stealing from the
     * given victim.
     */
    const handle_steal = () => {
        let victim = locatePlayerIndexByColor(playerSelected);
        const request = {
            state: gamestate,
            victim: victim
        };
        callBackend("steal", request);
        updateSelection(false);
        updatePlayerSelection("");
        setStealModal(false);
    };
    var players_to_steal = [];
    gamestate.players.forEach(player => {
        if (player.color != gamestate.current_player.color && player.resources != 0) {
            players_to_steal.push(player);
        }
    });
    const total_players = players_to_steal.length;
    let player_count_class = "one";
    switch (total_players) {
        case 2:
            player_count_class = "two";
            break;
        case 3:
            player_count_class = "three";
            break;
    }
    return (react_1.default.createElement("div", { className: "steal-modal " + (stealModalState ? "" : "disabled") },
        react_1.default.createElement("div", { className: "header" }, "KNIGHT CARD"),
        react_1.default.createElement("div", { className: "description" }, "Please select a player to steal from:"),
        react_1.default.createElement("div", { className: "players " + player_count_class }, players_to_steal.map((player) => {
            return react_1.default.createElement(AvatarComponent_1.default, { key: player.id, image: player.image, color: player.color, selected: isSelected, setSelected: (updateSelection), playerSelected: playerSelected, setPlayerSelected: updatePlayerSelection });
        })),
        react_1.default.createElement("div", { className: "stealButtons" },
            react_1.default.createElement("button", { className: "denySteal", onClick: () => cancel_steal() }, "Cancel"),
            react_1.default.createElement("button", { className: "affirmSteal " + (isSelected ? "" : "dark"), disabled: !isSelected, onClick: () => handle_steal() }, "Let's Steal!"))));
};
exports.default = StealModal;
