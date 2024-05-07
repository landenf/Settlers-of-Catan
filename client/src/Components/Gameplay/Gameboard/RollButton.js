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
require("../../../Styles/Gameplay/Player/RollButton.css");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const RollButton = ({ callBackend, rolled, updateRolled, isCurrentPlayer, state }) => {
    /**
     * Function used to call the backend to roll the dice and distribute resources.
     */
    function handleClick() {
        return __awaiter(this, void 0, void 0, function* () {
            callBackend("roll", { state });
            updateRolled(true);
        });
    }
    return (react_1.default.createElement("button", { "aria-label": "rollButton", className: 'rollButton ' + (rolled ? "roll-dark " : " ") +
            (isCurrentPlayer ? "" : "disabled"), onClick: handleClick, disabled: rolled },
        react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faDice })));
};
exports.default = RollButton;
