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
const react_hexgrid_1 = require("react-hexgrid");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const errors_1 = require("../../../Enums/errors");
/**
 * An individual component used by the gameboard as a tile. Each resource tile has a
 * resource type and a number associated.
 * @param props information about the tile passed through, typically from the backend server.
 */
const ResourceTile = ({ hex, index, tile, gamestate, updateState, showPotenialBuildOptions, callBackend }) => {
    const edgeLength = 10;
    const angles = [270, 330, 30, 90, 150, 210];
    const [roads, setRoads] = (0, react_2.useState)([]);
    const [settlements, setSettlements] = (0, react_2.useState)([]);
    (0, react_2.useEffect)(() => {
        let newRoads = [];
        let newSettlements = [];
        for (let i = 0; i < 6; i++) {
            const angleDeg = angles[i];
            const angleRad = Math.PI / 180 * angleDeg;
            const startX = edgeLength * Math.cos(angleRad);
            const startY = edgeLength * Math.sin(angleRad);
            const endX = edgeLength * Math.cos(angleRad + Math.PI / 3);
            const endY = edgeLength * Math.sin(angleRad + Math.PI / 3);
            let key = translateToNumberKey(i);
            let communitySpaceData = gamestate.gameboard.tiles[index].community_spaces[key];
            let isValidPotientialCommunityVertex = gamestate.client.potential_communities.some(community => community.tile_index === index && community.vertex === i);
            //if there is a potential community
            if ((showPotenialBuildOptions.settlements && isValidPotientialCommunityVertex)) {
                newSettlements.push({
                    x: startX,
                    y: startY,
                    level: 0,
                    color: 'grey',
                    vertex: i
                });
                //owned communtiy
            }
            else if (communitySpaceData.level > 0) {
                newSettlements.push({
                    x: startX,
                    y: startY,
                    level: communitySpaceData.level,
                    color: communitySpaceData.color,
                    vertex: i
                });
            }
            let isValidPotientialRoadEdge = gamestate.client.potential_roads.some(road => road.tile_index === index && road.edge === i);
            newRoads.push({
                startX: startX,
                startY: startY,
                endX: endX,
                endY: endY,
                color: (showPotenialBuildOptions.roads && isValidPotientialRoadEdge) ? 'grey' :
                    gamestate.gameboard.tiles[index].road_spaces[translateToNumberKey(i)]
            });
        }
        setRoads(newRoads);
        setSettlements(newSettlements);
    }, [gamestate, showPotenialBuildOptions.settlements, showPotenialBuildOptions.roads]);
    /**
     * Translates a number into a community space or road space's index.
     * @param toTranslate the index to translate to number key
     * @returns a number key that provides strong 0-5 typing to the index.
     */
    function translateToNumberKey(toTranslate) {
        var translation;
        switch (toTranslate) {
            case 0:
                translation = 0;
                break;
            case 1:
                translation = 1;
                break;
            case 2:
                translation = 2;
                break;
            case 3:
                translation = 3;
                break;
            case 4:
                translation = 4;
                break;
            case 5:
                translation = 5;
                break;
            default:
                throw new errors_1.InvalidIndexError("Tried accessing an invalid index of a community space!");
        }
        return translation;
    }
    //handle buying a road
    const handleEdgeClick = (idx, e) => __awaiter(void 0, void 0, void 0, function* () {
        e.stopPropagation();
        const road = {
            tile_index: index,
            edge: idx
        };
        const body = {
            roadData: road,
            state: gamestate
        };
        if (gamestate.roundNumber > 2) {
            callBackend("buyRoad", body);
        }
        else {
            callBackend("initialRoadPlacement", body);
        }
    });
    //handle buying a settlement
    const handleVertexClick = (idx, e) => __awaiter(void 0, void 0, void 0, function* () {
        e.stopPropagation();
        if (showPotenialBuildOptions.settlements) { // were in 'buy' mode
            const settlement = {
                tile_index: index,
                vertex: idx
            };
            const body = {
                settlementData: settlement,
                state: gamestate
            };
            if (gamestate.roundNumber > 2) {
                callBackend("buySettlement", body);
            }
            else {
                callBackend("initialSettlementPlacement", body);
            }
        }
    });
    return (react_1.default.createElement(react_hexgrid_1.Hexagon, { key: index, q: hex.q, r: hex.r, s: hex.s, fill: tile.type },
        roads.map((road, idx) => (react_1.default.createElement("line", { key: idx, x1: road.startX, y1: road.startY, x2: road.endX, y2: road.endY, stroke: road.color, strokeWidth: "1", onClick: (e) => handleEdgeClick(idx, e) }))),
        settlements.map((settlement, idx) => (react_1.default.createElement(react_1.default.Fragment, { key: idx },
            react_1.default.createElement("circle", { cx: settlement.x, cy: settlement.y, r: "2", fill: settlement.color }),
            react_1.default.createElement("text", { x: settlement.x, y: settlement.y, fill: "white", dominantBaseline: "middle", textAnchor: "middle", style: { fontSize: '0.2rem', cursor: settlement.level === 0 ? 'pointer' : 'default' }, onClick: (e) => handleVertexClick(settlement.vertex, e) }, settlement.level)))),
        react_1.default.createElement("circle", { cx: "0", cy: "0.5", r: "3.5", fill: "white" }),
        react_1.default.createElement(react_hexgrid_1.Text, { style: { fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" } }, tile.number_roll)));
};
exports.default = ResourceTile;
