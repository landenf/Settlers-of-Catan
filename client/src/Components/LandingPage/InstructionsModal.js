"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../../Styles/LandingAuth/InstructionsModal.css");
/**
 * A modal that pops out when the i icon is clicked on the homepage.
 * It brings a popup with the instructions of how to play the game.
 */
const InstructionsModal = ({ setInstructionsModal, instructionsModalState, }) => {
    return (react_1.default.createElement("div", { className: "instructions-modal " + (instructionsModalState ? "" : "disabled") },
        react_1.default.createElement("p", { className: "title" },
            react_1.default.createElement("b", null, "RULES")),
        react_1.default.createElement("div", { className: "rules" },
            react_1.default.createElement("p", null,
                react_1.default.createElement("b", null, "SETTING UP THE GAME"),
                react_1.default.createElement("br", null),
                "The first 2 rounds of gameplay will be for setup. On each turn, place 1 road and 1 settlement on the game board.",
                react_1.default.createElement("br", null),
                react_1.default.createElement("b", null, "BUILDING COSTS"),
                react_1.default.createElement("br", null),
                "You receive resources for each terrain hex around vour starting settlements. You will receive the appropriate resource cards from their stacks when the number on the hex is rolled. Each player keeps their resource cards hidden in their hand.",
                react_1.default.createElement("br", null),
                "Important: Settlements and cities may only be placed at the corners of the terrain hexes never along the edges. Roads may only be placed at the edges of the terrain hexes - 1 road per edge.",
                react_1.default.createElement("br", null),
                " ",
                react_1.default.createElement("b", null, "TURN OVERVIEW"),
                react_1.default.createElement("br", null),
                "On your turn, you can do the following in the order listed: You must roll for resource production (the result applies to all players). You may trade resource cards with other players and/or with the bank. You may build roads, settlements or cities and/or buy development cards. You may also play one development card at any time during your turn. After you're done, click the pass turn button."),
            react_1.default.createElement("p", { className: "list" },
                react_1.default.createElement("b", null, "1. Resource Production."),
                " You begin your turn by clicking the roll dice button. The sum of the dice determines which terrain hexes produce resources. Each player who has a settlement on an intersection that borders a terrain hex marked with the number rolled receives 1 resource card of the hex's type. If you have 2 or 3 settlements bordering that hex, you receive 1 resource card for each settlement. You receive 2 resource cards for each city you own that borders that hex."),
            react_1.default.createElement("p", { className: "list" },
                react_1.default.createElement("b", null, "2. Trade."),
                " Afterwards, you may trade freely to gain needed resource cards by clicking the \u201Ctrade\u201D button."),
            react_1.default.createElement("p", { className: "list" },
                react_1.default.createElement("b", null, "3. Build."),
                " Now you can build. Through building, you can increase your victory points, expand your road network, improve your resource production, and/or buy useful development cards. To build, you must pay specific combinations of resource cards. When you click the action you want to take and where you want to place, the appropriate number of cards will be taken from your hand. Development cards cannot be played until the next round."),
            react_1.default.createElement("p", { className: "sub-list" },
                "a) ",
                react_1.default.createElement("u", null, "Road (Requires: Brick & Lumber)."),
                " The player with the most number of roads on the board greater than 5 receives the special card of \u201CMost Roads\u201D ",
                react_1.default.createElement("i", null, "Tip: This creates a 4 victory point swing!")),
            react_1.default.createElement("p", { className: "sub-list" },
                "b) ",
                react_1.default.createElement("u", null, "Settlement (Requires: Brick, Lumber, Wool, & Grain)."),
                " Each settlement is worth 1 victory point."),
            react_1.default.createElement("p", { className: "sub-list" },
                "c) ",
                react_1.default.createElement("u", null, "City (Requires: 3 Ore & 2 Grain)."),
                " You may only establish a city by upgrading one of your settlements. When you upgrade a settlement to a city, the number on your settlement will increment to symbolize how many of each resource you will receive. Each city is worth the number it displays in victory points."),
            react_1.default.createElement("p", { className: "sub-list" },
                "d) ",
                react_1.default.createElement("u", null, "Buying a Development Card (Requires: Ore, Wool, & Grain)."),
                "When you purchase a development card, the actions corresponding to them will be automatically performed. Each has a different effect (see 4.a, below)."),
            react_1.default.createElement("p", { className: "list" },
                react_1.default.createElement("b", null, "4. Special Cases")),
            react_1.default.createElement("p", { className: "sub-list" },
                "a) ",
                react_1.default.createElement("u", null, "Knight Cards:"),
                " If you play a knight card, you will receive a random resource from the bank. If a player holds 3 knight cards, they receive the special card \"Largest Army,\" which is worth 2 victory points. If another player has more knight cards in front of them than the current holder of the Largest Army card, they immediately receive the special card and its 2 victory points."),
            react_1.default.createElement("p", { className: "sub-list" },
                "b) ",
                react_1.default.createElement("u", null, "Victory Point Cards:"),
                " When you draw this type of development card, you will automatically receive a victory point."),
            react_1.default.createElement("b", null, "ENDING THE GAME"),
            react_1.default.createElement("br", null),
            " If you have 10 or more victory points during your turn, the game ends and you are the winner! If you reach 10 points when it is not your turn, the game continues until any player (including you) has 10 points on their turn.")));
};
exports.default = InstructionsModal;
