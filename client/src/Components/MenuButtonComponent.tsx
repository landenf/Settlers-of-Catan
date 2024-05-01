import React, { useEffect, useState } from "react";
import "../Styles/MenuOptions.css";
import { BackendRequest, JoinGameByIdRequest } from "../Enums/requests";
import { LimitedSession } from "@shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * Interface to change toggle button styling and text.
 */
export interface MenuButtonProps {

  /**
   * The color of the button
   */
  color: string;

  /**
   * The internal text of the button
   */
  text: string;

  /**
   * Function used to call the backend given a request type and body
   */
  callBackend: (type: string, body: BackendRequest) => void;

  /**
   * The current state of the game
   */
  state: LimitedSession

  /**
   * Function to set the open / closed state of the room panel
   */
  setRoomPanel: (newState: boolean) => void;

  /**
   * The type of endpoint to hit on the backend.
   */
  backendCall: string;

  /**
   * If true, this button should be active and able to be clicked.
   */
  buttonsActive: boolean;

  /**
   * Function to update the active state of the side buttons.
   */
  setButtonsActive: (newState: boolean) => void;
}

/**
 * Creates a single button to toggle between on the
 * side menu (Landing Page).
 *
 * @param props color and text of the button.
 * @returns toggle button
 */
const MenuButtonComponent: React.FC<MenuButtonProps> = ({callBackend, state, color, text, 
  setRoomPanel, backendCall, buttonsActive, setButtonsActive}) => {

  const [joinId, setJoinId] = useState("");

  useEffect(() => {
    if (state.isValid) {
      setRoomPanel(true)
      setButtonsActive(false);
    } else {
      setRoomPanel(false);
      setButtonsActive(true);
    }
  })

  const handleButtonClick = () => {
    if (backendCall !== "joinGameByID") {
      callBackend(backendCall, {state: state})
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const request: JoinGameByIdRequest = {
      id: +joinId,
      state: state
    }

    if (joinId.length == 6) {
      callBackend(backendCall, request);
    } 

    setJoinId("");
  }

  return (
    <div className="toggleButton" style={{ backgroundColor: color }}>
      {(backendCall !== "joinGameByID" && 
        <button className={"toggleButton " + (buttonsActive ? "" : "side-button-disabled")} style={{ backgroundColor: color }}
        onClick={() => handleButtonClick()} disabled={!buttonsActive}
      >
        {text}
      </button>)}
      {backendCall === "joinGameByID" && (
          <div className="form-game-id">
            <form onSubmit={handleSubmit} className="game-id-container">
              <input className="input-game-id" type="number" value={joinId}
                onChange={(e) => setJoinId(e.target.value)} disabled={!buttonsActive}/>
              <button type="submit" className={"button-game-id " + (buttonsActive ? "" : "side-button-disabled")} 
                disabled={!buttonsActive}>
                <FontAwesomeIcon icon={faArrowRight}/>
              </button>
            </form>
          </div>
      )}
    </div>
  );
};
export default MenuButtonComponent;
