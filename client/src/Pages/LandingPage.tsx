import React, { useState } from "react";
import "../Styles/LandingPage.css";
import CreateRoomComponent from "../Components/CreateRoomComponent";
import CreateRoomToggleComponent from "../Components/CreateRoomToggleComponent";

const LandingPage: React.FC = () => {
  const [isNotInGame, setisNotInGame] = useState(true);

  const toggleGameMode = () => setisNotInGame(!isNotInGame);

  return (
    <div className="landing-page">
      <CreateRoomToggleComponent />
    </div>
  );
};

export default LandingPage;
