import React from "react";
import "../Styles/PlayerStats.css";
import "../Styles/JoinRoomWithCode.css";
import { LimitedPlayer, Player } from "@shared/types";
const PlayerStatsComponent = (player: LimitedPlayer) => {
  const player_image = `/images/${player.image}.jpg`;
  return (
    <div className="Profile">
      <div className="main-content-box">
        <img className="avatar" src={player_image} alt="Avatar Image" />
        <div className="stats"></div>
        <div className="playerName">STEVE</div>
      </div>
    </div>
  );
};

export default PlayerStatsComponent;
