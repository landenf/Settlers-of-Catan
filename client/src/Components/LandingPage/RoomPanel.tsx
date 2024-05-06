import React, { useEffect, useState } from "react";
import "../../Styles/LandingAuth/JoinRoomWithCode.css";
import { LimitedSession } from "@shared/types";
import { BackendRequest } from "../../Enums/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

interface JoinRoomWithCodeProps {
  
  /**
   * Current state of the game
   */
  state: LimitedSession

  /**
   * Function used to call the backend given a request type and body
   */
  callBackend: (type: string, body: BackendRequest) => void;

  /**
   * Function to set the open / closed state of the room panel
   */
    setRoomPanel: (newState: boolean) => void;

    /**
     * Function to update the active state of the side buttons.
     */
    setButtonsActive: (newState: boolean) => void;
}

/**
 * Panel that lets the player see the other players in the lobby and ready up 
 * to play a match.
 */
const RoomPanel: React.FC<JoinRoomWithCodeProps> = ({ state, callBackend, setRoomPanel, setButtonsActive }) => {

  const [ready, setReady] = useState(false);
  const players = state.players

  /**
   * Function used whenever the user presses the "leave" button. Sends
   * a backend call to leave the game.
   */
  const leaveGame = () => {

    const request: BackendRequest = {
      state: state
    }

    callBackend("leaveGame", request)
    setButtonsActive(true);
    setRoomPanel(false);
    setReady(false);

  }

  /**
   * Handles the action of clicking the ready button. Should
   * ready up the player and un-ready them depending on when
   * it's clicked.
   */
  const handleReady = () => {

    const request: BackendRequest = {
      state: state
    }

    callBackend("handleReady", request)
    setReady(!ready);
  }

  return (
    <div className="join-room-with-code">
      <div className="header-box">
        <p className="header-text"> ROOM: {state.id}</p>
      </div>
      <div className={("main-content-box")}>
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
                {(!player.ready && <FontAwesomeIcon icon={faBan} className="icon-not-ready"/>)}
                {(player.ready && <FontAwesomeIcon icon={faCheck} className="icon-ready"/>)}
              </p>
            </div>
          );
        })}
        <div className="buttons">
          <button className="leave-button" onClick={() => leaveGame()}>Leave</button>
          <button className={"ready-button " + (ready ? "ready" : "not-ready")}
          onClick={() => handleReady()}>{"Ready" + (ready ? "!" : "?")}</button>
        </div>
      </div>
    </div>
  );
};
export default RoomPanel;
