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
const react_hexgrid_1 = require("react-hexgrid");
const GameBoardStatic_1 = require("../../../StaticData/GameBoardStatic");
const Patterns_1 = __importDefault(require("../../../Styles/Patterns"));
const ResourceTile_1 = __importDefault(require("./ResourceTile"));
/**
 * The gameboard where the magic happens. Rendered at the center of the screen,
 * it shows each individual tile, their resource type, and their number to roll.
 * @param props a boardstate often retrieved and modified in the backend
 */
const GameBoard = ({ tiles, gamestate, updateState, showPotenialBuildOptions, callBackend }) => {
    // generate hexagonal grid
    const BoardGenerator = react_hexgrid_1.GridGenerator.getGenerator('hexagon');
    const initialHexagons = BoardGenerator.apply(null, GameBoardStatic_1.GameBoardConfiguration.mapProps);
    const [hexagons, setHexagons] = (0, react_1.useState)(initialHexagons);
    const [config, setConfig] = (0, react_1.useState)(GameBoardStatic_1.GameBoardConfiguration);
    const layout = config.layout;
    const size = { x: layout.width, y: layout.height };
    return (react_1.default.createElement("div", { id: 'GameBoard', style: { textAlign: 'center' } },
        react_1.default.createElement(react_hexgrid_1.HexGrid, { width: config.width, height: config.height },
            react_1.default.createElement(Patterns_1.default, null),
            react_1.default.createElement(react_hexgrid_1.Layout, { size: size, flat: layout.flat, spacing: layout.spacing, origin: config.origin }, hexagons.map((hex, i) => (react_1.default.createElement(ResourceTile_1.default, { key: `tile-${i}`, hex: hex, index: i, tile: tiles[i], gamestate: gamestate, updateState: updateState, showPotenialBuildOptions: showPotenialBuildOptions, callBackend: callBackend })))))));
};
exports.default = GameBoard;
