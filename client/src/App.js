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
const GameSession_1 = __importDefault(require("./Pages/GameSession"));
const react_router_dom_1 = require("react-router-dom");
const GameStateStatic_1 = require("./StaticData/GameStateStatic");
const Authentication_1 = __importDefault(require("./Pages/Authentication"));
const LandingPage_1 = __importDefault(require("./Pages/LandingPage"));
const backend = new WebSocket("ws://localhost:5000");
function App() {
    const [state, setState] = (0, react_1.useState)(GameStateStatic_1.MockLimitedGameState);
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Authentication_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/home", element: react_1.default.createElement(LandingPage_1.default, { backend: backend, state: state, setState: setState }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/session", element: react_1.default.createElement(GameSession_1.default, { state: state, setState: setState, backend: backend }) }))));
}
exports.default = App;
