import React, { useState } from "react";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/Signup";
import "../Styles/LandingPage.css";
import CreateRoomComponent from "../Components/CreateRoomComponent";

const AuthenticationPage: React.FC = () => {
  const [isNotInGame, setisNotInGame] = useState(true); // Start with Sign In

  const toggleGameMode = () => setisNotInGame(!isNotInGame);

  return (
    <div className="landing-page">
      <CreateRoomComponent />
    </div>
  );
};

export default AuthenticationPage;
