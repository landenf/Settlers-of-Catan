"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ResourceCard = (props) => {
    const cardType = props.type;
    return (react_1.default.createElement("div", { className: "resourceCard", style: { position: "relative" } },
        react_1.default.createElement("img", { className: "resourceImage", src: `./images/resources/${cardType}.jpg`, alt: cardType }),
        react_1.default.createElement("div", { className: "backgroundCircle" },
            react_1.default.createElement("div", { className: "cardNumber" }, props.value))));
};
exports.default = ResourceCard;
