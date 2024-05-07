"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../../../Styles/Gameplay/Gameboard/Dice.css");
/**
 * The dice component rendered in the center of the screen.
 */
const SingleDie = (props) => {
    const imgUrl = `./images/dice/${props.displayNumber}.png`;
    return (react_1.default.createElement("img", { className: "single-die", src: imgUrl }));
};
exports.default = SingleDie;
