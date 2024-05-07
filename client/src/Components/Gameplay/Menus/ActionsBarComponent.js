"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../../../Styles/Gameplay/Menus/ActionsBar.css");
/**
 * The sidebar used to trade resources, build settlements, and buy development
 * cards. Appears on a player's game turn.
 */
const ActionsBarComponent = ({ state, callBackend, setTradeModal, boughtDev, isCurrentPlayer, updatePotentialSettlements }) => {
    /**
   * A null body with the gamestate. This'll probably be removed before
   * heading onto production.
   */
    const NullBody = {
        state: state
    };
    const KnightBody = {
        state: state,
        victim: 1
    };
    const handleButtonClick = (action, body) => __awaiter(void 0, void 0, void 0, function* () {
        callBackend(action, body);
    });
    return (react_1.default.createElement("div", { "aria-label": "actions-bar", className: ("absolute-container " + ((isCurrentPlayer && state.roundNumber > 2) ? "" : "disabled")) },
        react_1.default.createElement("div", { className: "inner-container" },
            react_1.default.createElement("h1", { className: "text-bold" }, "BUILD"),
            react_1.default.createElement("div", { className: "line-thick" }),
            react_1.default.createElement("p", { className: "button indented-text", "aria-label": "build-road", onClick: () => updatePotentialSettlements('roads') }, "Road"),
            react_1.default.createElement("div", { className: "line" }),
            react_1.default.createElement("p", { className: "button indented-text", "aria-label": "build-settlement", onClick: () => updatePotentialSettlements('settlements') }, "Settlement"),
            react_1.default.createElement("div", { className: "line" }),
            react_1.default.createElement("p", { className: "button indented-text", onClick: () => handleButtonClick('buildCity', NullBody) }, "City"),
            react_1.default.createElement("div", { className: "line-thick" }),
            react_1.default.createElement("h1", { className: "text-bold" }, "TRADE"),
            react_1.default.createElement("div", { className: "line-thick" }),
            react_1.default.createElement("p", { className: "button indented-text", "aria-label": "trade", onClick: () => setTradeModal(true) }, "Bank"),
            react_1.default.createElement("div", { className: "line" }),
            react_1.default.createElement("div", { className: "line-thick" }),
            react_1.default.createElement("button", { className: "button text-bold " + (boughtDev ? "buy-dark" : ""), "aria-label": "buy-dev-card", disabled: boughtDev, onClick: () => handleButtonClick('buyDevCard', NullBody) }, "DEVELOPMENT CARD"),
            react_1.default.createElement("div", { className: "line-thick" }),
            react_1.default.createElement("h1", { className: "button text-bold", "aria-label": "passTurn", onClick: () => handleButtonClick('passTurn', NullBody) }, "PASS TURN"),
            react_1.default.createElement("div", { className: "line-thick" }))));
};
exports.default = ActionsBarComponent;
