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
const firebase_config_js_1 = require("../../firebase-config.js");
require("../../Styles/LandingAuth/AuthenticationStyles.css");
const react_router_dom_1 = require("react-router-dom");
const SignInComponent = ({ onSwitch }) => {
    const [loginEmail, setLoginEmail] = (0, react_1.useState)('');
    const [loginPassword, setLoginPassword] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)(); // For navigation
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(firebase_config_js_1.auth, loginEmail, loginPassword);
            console.log(userCredential.user);
            setErrorMessage('');
            navigate('/home');
        }
        catch (error) {
            if (error.code === 'auth/invalid-login-credentials') {
                setErrorMessage('Invalid login credentials');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
            else {
                alert(error.code);
            }
        }
    });
    return (react_1.default.createElement("div", { className: "auth-container" },
        react_1.default.createElement("div", { className: "login-text" }, "Sign In"),
        react_1.default.createElement("input", { className: "login-input", type: "email", value: loginEmail, onChange: (e) => setLoginEmail(e.target.value), placeholder: "Enter your email" }),
        react_1.default.createElement("input", { className: "login-input", type: "password", value: loginPassword, onChange: (e) => setLoginPassword(e.target.value), placeholder: "Enter your password" }),
        react_1.default.createElement("button", { className: "auth-button", onClick: handleLogin }, "Sign In"),
        errorMessage && react_1.default.createElement("p", null, errorMessage),
        react_1.default.createElement("div", { className: "switch-auth", onClick: onSwitch }, "Need an account? Sign Up")));
};
exports.default = SignInComponent;
