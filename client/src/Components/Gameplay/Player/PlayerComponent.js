"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../../../Styles/Gameplay/Player/PlayerComponent.css");
/**
 * A React component corresponding to a specific Catan player. Created using
 * information gathered from its prop, a player type. Displays character color,
 * avatar, total VP, total resources, and current game awards.
 * @param player A player type. Holds necessary render information including
 * total VP, resources, and avatar.
 * @returns a front-end component representing a player and their current stats.
 */
const PlayerComponent = (player) => {
    /**
     * The player's avatar URL. TODO: Connect to a database of user images.
     */
    const player_image = `/images/${player.image}.jpg`;
    /**
     * The player's screen name.
     */
    const player_name = player.name;
    /**
     * The player's in-game color, to be displayed as a border on their
     * avatar.
     */
    const avatar_color = `avatar ${player.color}`;
    /**
     * The player's total count of victory points.
     */
    const player_vp = player.vp;
    /**
     * The player's total count of resources.
     */
    const player_resources = player.resources;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "playerBox" },
            react_1.default.createElement("img", { src: player_image, className: avatar_color }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", { className: "heading" }, player_name),
                react_1.default.createElement("div", { className: "statContainer" },
                    react_1.default.createElement("div", { className: "statBox" },
                        react_1.default.createElement("p", { className: "statHeading" }, player_vp),
                        react_1.default.createElement("div", { className: "statText" }, "Victory Points")),
                    react_1.default.createElement("div", { className: "statBox" },
                        react_1.default.createElement("p", { className: "statHeading" }, player_resources),
                        react_1.default.createElement("div", { className: "statText" }, "Resources"))))),
        react_1.default.createElement("div", { className: "playerAwards" },
            react_1.default.createElement("img", { src: "/images/temp_road.png", className: player.hasMostRoads ? "" : "hidden" }),
            react_1.default.createElement("img", { src: "/images/temp_knight.png", className: player.hasLargestArmy ? "" : "hidden" }))));
};
exports.default = PlayerComponent;
