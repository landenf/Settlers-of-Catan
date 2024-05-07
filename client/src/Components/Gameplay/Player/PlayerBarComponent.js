"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PlayerComponent_1 = __importDefault(require("./PlayerComponent"));
require("../../../Styles/Gameplay/Player/PlayerBarComponent.css");
/**
 * A React component representing a list of players to be rendered on the left
 * side of the screen.
 * @param props an object holding a list of players
 */
const PlayerBarComponent = (props) => {
    /**
     * A list of players to be rendered through the player bar component.
     */
    const players = props.players.map((player) => react_1.default.createElement(PlayerComponent_1.default, { key: player.id, id: player.id, name: player.name, image: player.image, color: player.color, vp: player.vp, hasLargestArmy: player.hasLargestArmy, hasMostRoads: player.hasMostRoads, resources: player.resources, ready: player.ready }));
    return (react_1.default.createElement("ul", null, players));
};
exports.default = PlayerBarComponent;
