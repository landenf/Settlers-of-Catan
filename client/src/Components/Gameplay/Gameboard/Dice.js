"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../../../Styles/Gameplay/Gameboard/Dice.css");
const SingleDie_1 = __importDefault(require("./SingleDie"));
const Dice = (props) => {
    var die1Number = props.numberRolled.number1;
    var die2Number = props.numberRolled.number2;
    return (react_1.default.createElement("div", { className: "dice" },
        react_1.default.createElement(SingleDie_1.default, { displayNumber: die1Number }),
        react_1.default.createElement("div", null),
        react_1.default.createElement(SingleDie_1.default, { displayNumber: die2Number })));
};
exports.default = Dice;
