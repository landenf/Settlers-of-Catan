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
const react_1 = require("@testing-library/react");
const GameStateStatic_1 = require("../StaticData/GameStateStatic");
const react_2 = __importDefault(require("react"));
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const mockGameSession_1 = __importDefault(require("./__mocking__/mockGameSession"));
require("@testing-library/jest-dom");
/**
 * A mock game state that's reset after every test.
 */
var mockGame = GameStateStatic_1.MockLimitedGameState;
beforeEach(() => { mockGame = GameStateStatic_1.MockLimitedGameState; });
describe("In the Actions Bar", () => {
    it("The trading modal should open when 'trade' is clicked", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("trade"));
        }));
        expect(react_1.screen.getByLabelText("test-trade-modal")).toHaveClass("tradeModalOn");
    }));
    it("The dev card button should be disabled once clicked", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("buy-dev-card"));
        }));
        expect(react_1.screen.getByLabelText("buy-dev-card")).toBeDisabled();
    }));
    it("The dev card should be enabled by default", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        expect(react_1.screen.getByLabelText("buy-dev-card")).toBeEnabled();
    }));
    it("The actions bar should be enabled for the client", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        expect(react_1.screen.getByLabelText("actions-bar")).not.toHaveClass("disabled");
    }));
    it("The actions bar should be disabled for other non-current players", () => __awaiter(void 0, void 0, void 0, function* () {
        mockGame.client = GameStateStatic_1.MockGameState.players[1];
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        expect(react_1.screen.getByLabelText("actions-bar")).toHaveClass("disabled");
    }));
    it("The road purchase button should call the backend", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("build-road"));
        }));
        expect(react_1.screen.getByLabelText("test-gameboard")).toHaveClass("road-found");
    }));
    it("The settlement purchase button should call the backend", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("build-settlement"));
        }));
        expect(react_1.screen.getByLabelText("test-gameboard")).toHaveClass("settlement-found");
    }));
    it("The pass turn button should make the whole component disappear", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("passTurn"));
        }));
        expect(react_1.screen.getByLabelText("actions-bar")).toHaveClass("disabled");
    }));
});
