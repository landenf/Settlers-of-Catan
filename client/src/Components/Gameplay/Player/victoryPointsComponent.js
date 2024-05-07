"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../../../Styles/Gameplay/Player/VictoryPointsComponent.css");
/**
 * A red box to display the user's current count of victory points.
 * @param props the amount of victory points the current user has
 */
const VictoryPointsComponent = (props) => {
    return (react_1.default.createElement("div", { className: "victoryPoints" },
        react_1.default.createElement("div", { className: "victoryPointBackground" }),
        react_1.default.createElement("div", { className: "victoryPointsLabel" }, "victory points"),
        react_1.default.createElement("div", { className: "victoryPointsNumber" }, props.vp)));
};
exports.default = VictoryPointsComponent;
