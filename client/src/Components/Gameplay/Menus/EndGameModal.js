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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const auth_1 = require("react-firebase-hooks/auth");
const firestore_1 = require("firebase/firestore");
const firebase_config_1 = require("../../../firebase-config");
require("../../../Styles/EndModal.css");
require("../../../Styles/Gameplay/Player/PlayerComponent.css");
const react_router_dom_1 = require("react-router-dom");
/**
 * Component used to display the end game summary and options.
 */
const EndGameModal = ({ endGameModalState, setEndGameModal, gamestate, callBackend }) => {
    const [user, loading, error] = (0, auth_1.useAuthState)(firebase_config_1.auth);
    const sortedPlayers = [...gamestate.players].sort((a, b) => b.vp - a.vp);
    const navigate = (0, react_router_dom_1.useNavigate)(); // For navigation
    (0, react_1.useEffect)(() => {
        const updateGameStatistics = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                const userProfilesRef = (0, firestore_1.collection)(firebase_config_1.db, "UserProfiles");
                const q = (0, firestore_1.query)(userProfilesRef, (0, firestore_1.where)("uid", "==", user.uid));
                try {
                    const querySnapshot = yield (0, firestore_1.getDocs)(q);
                    if (querySnapshot.empty)
                        throw new Error('User profile not found.');
                    const userProfileDoc = querySnapshot.docs[0];
                    const userProfileRef = userProfileDoc.ref;
                    const storedData = userProfileDoc.data();
                    const client = gamestate.client;
                    yield (0, firestore_1.updateDoc)(userProfileRef, {
                        GamesWon: storedData.GamesWon + ((gamestate.winner && gamestate.winner.name === storedData.username) ? 1 : 0),
                        LargestArmy: storedData.LargestArmy + (gamestate.current_largest_army == storedData.username ? 1 : 0),
                        MostRoads: storedData.MostRoads + (gamestate.current_longest_road == storedData.username ? 1 : 0), //Refactor when elena changes type to player - add .name to current longest road
                        VictoryPoints: storedData.VictoryPoints + client.vp,
                        TotalWheat: storedData.VictoryPoints + client.vp,
                        TotalStone: storedData.TotalStone + client.hand.stone,
                        TotalWood: storedData.TotalWood + client.hand.wood,
                        TotalBrick: storedData.TotalBrick + client.hand.brick,
                        TotalSheep: storedData.TotalSheep + client.hand.sheep
                    });
                    console.log('Game statistics updated successfully.');
                }
                catch (error) {
                    console.error('Error updating game statistics:', error);
                }
            }
        });
        if (user) {
            updateGameStatistics();
        }
    }, [user]);
    // Function to render a medal icon based on rank
    const renderMedal = (rank) => {
        switch (rank) {
            case 1:
                return react_1.default.createElement("span", null, "\uD83E\uDD47"); // Gold medal emoji as an example
            case 2:
                return react_1.default.createElement("span", null, "\uD83E\uDD48"); // Silver medal emoji
            case 3:
                return react_1.default.createElement("span", null, "\uD83E\uDD49"); // Bronze medal emoji
            default:
                return null; // No medal for ranks below 3
        }
    };
    /**
     * Function to exit the end game modal and potentially the application or game lobby.
     */
    const handleExitGame = () => {
        setEndGameModal(false);
        navigate('/home');
    };
    return (react_1.default.createElement("div", { className: "end-game-modal " + (endGameModalState ? "" : "disabled") },
        react_1.default.createElement("div", { className: "header" }, "Game Over"),
        react_1.default.createElement("div", { className: "description" },
            "Results: ",
            gamestate.winner ? gamestate.winner.name : "No Winner (Error)"),
        react_1.default.createElement("div", { className: "content" },
            react_1.default.createElement("div", { className: "personal-info" },
                react_1.default.createElement("img", { style: { height: '15vh', width: '15vh', borderRadius: '90%' }, src: '/images/empty-avatar.jpg', alt: "Avatar Image" }),
                react_1.default.createElement("p", null,
                    "Total Victory Points: ",
                    gamestate.current_player.vp)),
            react_1.default.createElement("div", { className: "leaderboard" },
                react_1.default.createElement("div", { className: "description" }, "Leaderboard:"),
                sortedPlayers.map((player, index) => (react_1.default.createElement("div", { key: player.id },
                    react_1.default.createElement("p", null,
                        renderMedal(index + 1),
                        " ",
                        player.name,
                        " - ",
                        player.vp,
                        " Victory Points")))))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { className: "game-end-buttons", onClick: () => handleExitGame() }, "Exit Game"))));
};
exports.default = EndGameModal;
