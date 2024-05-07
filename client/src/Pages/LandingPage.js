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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../Styles/LandingAuth/LandingPage.css");
const MenuToggleComponent_1 = __importDefault(require("../Components/LandingPage/MenuToggleComponent"));
const RoomPanel_1 = __importDefault(require("../Components/LandingPage/RoomPanel"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const InstructionsModal_1 = __importDefault(require("../Components/LandingPage/InstructionsModal"));
const PlayerStatisticsComponent_1 = __importDefault(require("../Components/LandingPage/PlayerStatisticsComponent"));
const react_router_dom_1 = require("react-router-dom");
/**
 * Page where the user starts after logging in and sees their individual player stats.
 * From here they can choose to create a game, join an online game, or join an already
 * existing game with a join code.
 *
 * @returns Landing page for the user.
 */
const LandingPage = ({ backend, state, setState }) => {
    const [roomPanelOpen, setOpenPanel] = (0, react_1.useState)(false);
    const [buttonsActive, setButtonsActive] = (0, react_1.useState)(true);
    const [instructionsModalEnabled, setInstructionsModal] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)(); // For navigation
    (0, react_1.useEffect)(() => {
        if (state.isStarted) {
            navigate("/session");
        }
    });
    const updateInstructionsModal = () => {
        setInstructionsModal(!instructionsModalEnabled);
    };
    /**
     * Used to update the rendering of the client's screen when we
     * receive the gamestate from the backend.
     */
    backend.addEventListener("message", (msg) => {
        const newState = JSON.parse(msg.data);
        setState(newState);
    });
    /**
     * Uses the websocket to send information to the backend and retrieve
     * gamestate information.
     * @param type the "endpoint" to hit (/roll or /buyDevCard for example)
     * @param body any payload information to send to the backend
     */
    const callBackend = (type, body) => {
        const message = {
            endpoint: type,
            body: body,
        };
        backend.send(JSON.stringify(message));
    };
    return (react_1.default.createElement("div", { className: "landing-page" },
        react_1.default.createElement(InstructionsModal_1.default, { setInstructionsModal: () => setInstructionsModal(false), instructionsModalState: instructionsModalEnabled }),
        react_1.default.createElement("div", { className: "menu" },
            react_1.default.createElement("div", { onClick: updateInstructionsModal, className: "info-button" },
                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "info-icon", icon: free_solid_svg_icons_1.faCircleInfo })),
            react_1.default.createElement("p", { className: "catanTitle" }, "CATAN"),
            react_1.default.createElement(MenuToggleComponent_1.default, { callBackend: callBackend, state: state, setRoomPanel: setOpenPanel, buttonsActive: buttonsActive, setButtonsActive: setButtonsActive })),
        !roomPanelOpen && (react_1.default.createElement(PlayerStatisticsComponent_1.default, null)),
        (roomPanelOpen && react_1.default.createElement(RoomPanel_1.default, { state: state, callBackend: callBackend, setRoomPanel: setOpenPanel, setButtonsActive: setButtonsActive }))));
};
exports.default = LandingPage;
