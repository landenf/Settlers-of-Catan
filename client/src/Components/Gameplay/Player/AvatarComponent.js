"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AvatarComponent = ({ image, color, selected, setSelected, playerSelected, setPlayerSelected }) => {
    const player_image = `/images/${image}.jpg`;
    /**
     * Lets the player select another player by clicking on their avatar.
     */
    const handleClick = () => {
        if (color == playerSelected) {
            setSelected(!selected);
            setPlayerSelected("");
        }
        else {
            setPlayerSelected(color);
            setSelected(true);
        }
    };
    const playerChosen = color == playerSelected;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("img", { src: player_image, className: (playerChosen ? "chosen" : "") + " player avatar " + color, onClick: () => handleClick() })));
};
exports.default = AvatarComponent;
