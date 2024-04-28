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

          const color = player.color === "red" ? "Red" :
            player.color === "blue" ? "Blue" :
            player.color === "orange" ? "Orange" :
            "Green"

          return (
            <div className="lobby-players" key={player.color}>
              <div className={"player-color-banner banner-" + (player.color)}>{color}</div>
              <p className="players-in-room">
                P{players.indexOf(player) + 1}: {player.name}
              </p>
            </div>
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
