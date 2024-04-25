import React, { useState } from "react";
import "../Styles/JoinRoomWithCode.css";
import { LimitedSession } from "@shared/types";

interface JoinRoomWithCodeProps {
  state: LimitedSession
}

/**
 * Display area for a user to enter a code
 * to join an already existing game.
 *
 */
const JoinRoomWithCodeComponent = (props: JoinRoomWithCodeProps) => {
  const [active, setActive] = useState();
  const players = props.state.players
  return (
    <div className="join-room-with-code">
      <div className="header-box">
        <p className="header-text"> ROOM: {props.state.id}</p>
      </div>
      <div className="main-content-box">
        {players.map((player) => {
          return (
            <p className="players-in-room" key={player.color}>
              P{players.indexOf(player) + 1}: {player.name}
            </p>
          );
        })}
        <p></p>
        {/* <p></p> */}
        <div className="buttons">
          <button className="leave-button">Leave</button>
          <button className="ready-button">Ready</button>
        </div>
      </div>
    </div>
  );
};
export default JoinRoomWithCodeComponent;
