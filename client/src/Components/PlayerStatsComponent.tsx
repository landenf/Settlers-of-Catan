import React from "react";
import "../Styles/PlayerStats.css";
import "../Styles/JoinRoomWithCode.css";
import { LimitedPlayer, Player } from "@shared/types";
const PlayerStatsComponent = (player: Player) => {
  const player_image = `/images/${player.image}.jpg`;
  return (
    <div className="Profile">
      <div className="main-content-box">
        <img className="avatar" src={player_image} alt="Avatar Image" />
        <div className="playerName">STEVE</div>
        <div className="stats">
          <p className="individual-stat">total wins: 2</p>
          <p className="individual-stat">total wins: 2</p>
          <p className="individual-stat">total wins: 2</p>
          <p className="individual-stat">total wins: 2</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsComponent;
