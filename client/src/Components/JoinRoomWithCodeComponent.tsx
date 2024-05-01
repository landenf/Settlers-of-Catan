import React, { useState } from "react";
import "../Styles/JoinRoomWithCode.css";

const players = ["Player 1", "Player 2", "Player 3", "Player 4"];

/**
 * Display area for a user to enter a code
 * to join an already existing game.
 *
 */
const JoinRoomWithCodeComponent = () => {
  const [active, setActive] = useState();
  return (
    <div className="join-room-with-code">
      <div className="header-box">
        <p className="header-text"> ROOM: 123456</p>
      </div>
      <div className="main-content-box">
        {players.map((player) => {
          return (
            <p className="players-in-room">
              P{players.indexOf(player) + 1}: {player}
            </p>
          );
        })}
        <p></p>
        <div className="buttons">
          <button className="leave-button">Leave</button>
          <button className="ready-button">Ready</button>
        </div>
      </div>
    </div>
  );
};
export default JoinRoomWithCodeComponent;
