"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../../Styles/LandingAuth/MenuOptions.css");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
/**
 * Creates a single button to toggle between on the
 * side menu (Landing Page).
 *
 * @param props color and text of the button.
 * @returns toggle button
 */
const MenuButtonComponent = ({ callBackend, state, color, text, setRoomPanel, backendCall, buttonsActive, setButtonsActive }) => {
    const [joinId, setJoinId] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (state.isValid) {
            setRoomPanel(true);
            setButtonsActive(false);
        }
        else {
            setRoomPanel(false);
            setButtonsActive(true);
        }
    });
    const handleButtonClick = () => {
        if (backendCall !== "joinGameByID") {
            callBackend(backendCall, { state: state });
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const request = {
            id: +joinId,
            state: state
        };
        if (joinId.length == 6) {
            callBackend(backendCall, request);
        }
        setJoinId("");
    };
    return (react_1.default.createElement("div", { className: "toggleButton", style: { backgroundColor: color } },
        (backendCall !== "joinGameByID" &&
            react_1.default.createElement("button", { className: "toggleButton " + (buttonsActive ? "" : "side-button-disabled"), style: { backgroundColor: color }, onClick: () => handleButtonClick(), disabled: !buttonsActive }, text)),
        backendCall === "joinGameByID" && (react_1.default.createElement("div", { className: "form-game-id" },
            react_1.default.createElement("form", { onSubmit: handleSubmit, className: "game-id-container" },
                react_1.default.createElement("input", { className: "input-game-id", type: "number", value: joinId, placeholder: "Enter Game Code", onChange: (e) => setJoinId(e.target.value), disabled: !buttonsActive }),
                react_1.default.createElement("button", { type: "submit", className: "button-game-id " + (buttonsActive ? "" : "side-button-disabled"), disabled: !buttonsActive },
                    react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faArrowRight })))))));
};
exports.default = MenuButtonComponent;
