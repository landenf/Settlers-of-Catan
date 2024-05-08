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
describe("In the roll button", () => {
    it("The Roll button should be enabled on turn", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        expect(react_1.screen.getByLabelText("rollButton")).toBeEnabled();
    }));
    it("The Roll button should be disabled once clicked", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("rollButton"));
        }));
        expect(react_1.screen.getByLabelText("rollButton")).toBeDisabled();
    }));
    it("The Roll button should be disabled on other players' turns", () => __awaiter(void 0, void 0, void 0, function* () {
        mockGame.client = GameStateStatic_1.MockGameState.players[1];
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        expect(react_1.screen.getByLabelText("rollButton")).toHaveClass("disabled");
    }));
    it("The Roll button once clicked should change the number the dice rolled", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(react_2.default.createElement(mockGameSession_1.default, { state: mockGame }));
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_event_1.default.click(react_1.screen.getByLabelText("rollButton"));
        }));
        expect(mockGame.diceNumber.number1 != 1);
        expect(mockGame.diceNumber.number2 != 1);
    }));
});
