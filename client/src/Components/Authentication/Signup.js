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
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore"); // For Firestore operations
const firebase_config_js_1 = require("../../firebase-config.js");
require("../../Styles/LandingAuth/AuthenticationStyles.css");
const react_router_dom_1 = require("react-router-dom");
const SignUpComponent = ({ onSwitch }) => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)(); // For navigation
    const handleSignUp = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(firebase_config_js_1.auth, email, password);
            console.log(userCredential.user);
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_config_js_1.db, "UserProfiles", userCredential.user.uid), {
                username: username,
                email: email,
                uid: userCredential.user.uid,
                GamesWon: 0,
                LargestArmy: 0,
                MostRoads: 0,
                VictoryPoints: 0,
                TotalWheat: 0,
                TotalStone: 0,
                TotalWood: 0,
                TotalBrick: 0,
                TotalSheep: 0
            });
            setErrorMessage('');
            navigate('/home'); // Navigate on success
        }
        catch (error) { // Adjust error handling as needed
            console.error("Error signing up: ", error);
            setErrorMessage(error.message || 'An error occurred during sign up.');
        }
    });
    return (react_1.default.createElement("div", { className: "auth-container" },
        react_1.default.createElement("div", { className: "login-text" }, "Sign Up"),
        react_1.default.createElement("input", { className: "login-input", type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Enter your username" }),
        react_1.default.createElement("input", { className: "login-input", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email" }),
        react_1.default.createElement("input", { className: "login-input", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password" }),
        react_1.default.createElement("button", { className: "auth-button", onClick: handleSignUp }, "Sign Up"),
        errorMessage && react_1.default.createElement("p", null, errorMessage),
        react_1.default.createElement("div", { className: "switch-auth", onClick: onSwitch }, "Already have an account? Sign In")));
};
exports.default = SignUpComponent;
