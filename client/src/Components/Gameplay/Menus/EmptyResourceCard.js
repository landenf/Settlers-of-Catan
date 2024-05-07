"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
require("../../../Styles/Gameplay/Player/Hand.css");
const EmptyResourceCard = ({ type, cardIsSelected, setCardIsSelected, tradeType, tradeParameters }) => {
    const [numCards, setNumCards] = (0, react_2.useState)(0);
    const cardType = type;
    const [isSelected, setSelected] = (0, react_2.useState)(false);
    /**
     * Function to set the card if there is not one already set
     * in this row.
     */
    const setIfNoSelection = () => {
        if (!isSelected && !cardIsSelected) {
            setSelected(true);
            setCardIsSelected(true);
            updateTradeParams(cardType);
        }
        else if (isSelected) {
            setSelected(false);
            setCardIsSelected(false);
            updateTradeParams("");
        }
    };
    /**
     * Updates the trade parameters.
     * @param newParam the new resource to offer or gain
     */
    const updateTradeParams = (newParam) => {
        if (tradeType == "offer") {
            tradeParameters.offer = newParam;
        }
        else {
            tradeParameters.gain = newParam;
        }
    };
    return (react_1.default.createElement("div", { className: "resourceCard empty " + (isSelected ? "selected" : ""), style: { position: "relative" }, onClick: () => setIfNoSelection() },
        react_1.default.createElement("img", { className: "resourceImage", src: `./images/resources/${cardType}.jpg`, alt: cardType })));
};
exports.default = EmptyResourceCard;
