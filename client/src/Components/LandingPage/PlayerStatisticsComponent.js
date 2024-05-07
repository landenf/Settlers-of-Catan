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
const firebase_config_1 = require("../../firebase-config");
require("../../Styles/Gameplay/Player/PlayerStats.css");
const PlayerStatisticsComponent = () => {
    const [user, loading, error] = (0, auth_1.useAuthState)(firebase_config_1.auth);
    const [userProfile, setUserProfile] = (0, react_1.useState)(null);
    const [profileError, setProfileError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchUserProfile = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                const userProfilesRef = (0, firestore_1.collection)(firebase_config_1.db, "UserProfiles");
                const q = (0, firestore_1.query)(userProfilesRef, (0, firestore_1.where)("uid", "==", user.uid));
                try {
                    const querySnapshot = yield (0, firestore_1.getDocs)(q);
                    const userProfileDoc = querySnapshot.docs[0];
                    if (userProfileDoc.exists()) {
                        setUserProfile(userProfileDoc.data());
                    }
                    else {
                        setProfileError('User profile not found.');
                    }
                }
                catch (error) {
                    setProfileError(error.message);
                }
            }
        });
        fetchUserProfile();
    }, [user]);
    if (loading || !userProfile)
        return react_1.default.createElement("div", null, "Loading...");
    if (error || profileError)
        return react_1.default.createElement("div", null,
            "Error: ",
            (error === null || error === void 0 ? void 0 : error.message) || profileError);
    if (!user)
        return react_1.default.createElement("div", null, "Please login to view your profile.");
    const player_image = `/images/empty-avatar.jpg`;
    return (react_1.default.createElement("div", { className: "Profile" },
        react_1.default.createElement("div", { className: "main-stats-box" },
            react_1.default.createElement("img", { style: { height: '15vh', width: '15vh', borderRadius: '90%' }, src: player_image, alt: "Avatar Image" }),
            react_1.default.createElement("div", { className: "playerName" }, userProfile.username),
            react_1.default.createElement("div", { className: "stats" },
                react_1.default.createElement("div", { className: "stats-column" },
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Total Victory Points: ",
                        userProfile.VictoryPoints),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Games Won: ",
                        userProfile.GamesWon),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Largest Army: ",
                        userProfile.LargestArmy),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Most Roads: ",
                        userProfile.MostRoads)),
                react_1.default.createElement("div", { className: "stats-column" },
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Total Wheat: ",
                        userProfile.TotalWheat),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Total Rock: ",
                        userProfile.TotalRock),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Total Wood: ",
                        userProfile.TotalWood),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Total Brick: ",
                        userProfile.TotalBrick),
                    react_1.default.createElement("p", { className: "individual-stat" },
                        "Total Sheep: ",
                        userProfile.TotalSheep))))));
};
exports.default = PlayerStatisticsComponent;
