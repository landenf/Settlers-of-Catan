"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Patterns.js
const react_1 = __importDefault(require("react"));
const Patterns = () => (react_1.default.createElement("defs", null,
    react_1.default.createElement("pattern", { id: "wheat", width: "1", height: "1" },
        react_1.default.createElement("image", { href: "./images/resources/wheat.jpg", width: "20%", height: "20%", preserveAspectRatio: "none" })),
    react_1.default.createElement("pattern", { id: "stone", width: "1", height: "1" },
        react_1.default.createElement("image", { href: "./images/resources/stone.jpg", width: "20%", height: "20%", preserveAspectRatio: "none" })),
    react_1.default.createElement("pattern", { id: "sheep", width: "1", height: "1" },
        react_1.default.createElement("image", { href: "./images/resources/sheep.jpg", width: "20%", height: "20%", preserveAspectRatio: "none" })),
    react_1.default.createElement("pattern", { id: "brick", width: "1", height: "1" },
        react_1.default.createElement("image", { href: "./images/resources/brick.jpg", width: "20%", height: "20%", preserveAspectRatio: "none" })),
    react_1.default.createElement("pattern", { id: "wood", width: "1", height: "1" },
        react_1.default.createElement("image", { href: "./images/resources/wood.jpg", width: "20%", height: "20%", preserveAspectRatio: "none" }))));
exports.default = Patterns;
