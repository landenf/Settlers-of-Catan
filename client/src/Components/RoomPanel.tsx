import React from "react";
import "../Styles/JoinRoomWithCode.css";
import { LimitedSession } from "@shared/types";

interface JoinRoomWithCodeProps {
  state: LimitedSession
}

/**
 * Panel that lets the player see the other players in the lobby and ready up 
 * to play a match.
 */
const RoomPanel = (props: JoinRoomWithCodeProps) => {

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
        <div className="buttons">
          <button className="leave-button">Leave</button>
          <button className="ready-button">Ready</button>
        </div>
      </div>
    </div>
  );
};
export default RoomPanel;
