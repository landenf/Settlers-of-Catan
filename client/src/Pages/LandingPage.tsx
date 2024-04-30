import React, { useState } from "react";
import "../Styles/LandingPage.css";
import MenuToggleComponent from "../Components/MenuToggleComponent";
import JoinRoomWithCodeComponent from "../Components/JoinRoomWithCodeComponent";

/**
 * Page where the user starts after logging in and sees their individual player stats.
 * From here they can choose to create a game, join an online game, or join an already
 *  existing game with a join code.
 *
 * @returns Landing page for the user.
 */
const LandingPage: React.FC = () => {
  const [isNotInGame, setisNotInGame] = useState(true);

  const toggleGameMode = () => setisNotInGame(!isNotInGame);

  return (
    <div className="landing-page">
      <div className="menu">
        <p className="catanTitle">CATAN</p>
        <MenuToggleComponent />
      </div>
      <JoinRoomWithCodeComponent />
    </div>
  );
};

export default LandingPage;
