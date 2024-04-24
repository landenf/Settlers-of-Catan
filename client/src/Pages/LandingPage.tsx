import React, { useState } from "react";
import "../Styles/LandingPage.css";
import MenuToggleComponent from "../Components/MenuToggleComponent";
import JoinRoomWithCodeComponent from "../Components/JoinRoomWithCodeComponent";
import PlayerStatsComponent from "../Components/PlayerStatsComponent";
import { players } from "../StaticData/PlayerData";

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
      <PlayerStatsComponent
        key={players[0].id}
        id={players[0].id}
        name={players[0].name}
        image={players[0].image}
        color={players[0].color}
        vp={players[0].vp}
        resources={players[0].resources}
      />
    </div>
  );
};

export default LandingPage;
