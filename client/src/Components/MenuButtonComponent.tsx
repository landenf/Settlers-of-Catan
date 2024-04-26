import React, { useState } from "react";
import "../Styles/MenuOptions.css";
import { BackendRequest, JoinGameByIdRequest } from "../Enums/requests";
import { LimitedSession } from "@shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * Interface to change toggle button styling
 * and text.
 */
export interface CreateRoomProp {
  color: string;

  text: string;

  callBackend: (type: string, body: BackendRequest) => void;

  state: LimitedSession

  setCreatePanel: (newState: boolean) => void;

  backendCall: string;
}

/**
 * Creates a single button to toggle between on the
 * side menu (Landing Page).
 *
 * @param props color and text of the button.
 * @returns toggle button
 */
const MenuButtonComponent: React.FC<CreateRoomProp> = ({callBackend, state, color, text, setCreatePanel, backendCall}) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);
  const [joinId, setJoinId] = useState("");

  const toggleRoomCreation = () => setIsCreatingRoom(!isCreatingRoom);

  const handleButtonClick = () => {
    if (backendCall !== "joinGameByID") {
      callBackend(backendCall, {state: state})
      setCreatePanel(true)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const request: JoinGameByIdRequest = {
      id: +joinId,
      state: state
    }
    setJoinId("");
    callBackend(backendCall, request)
    setCreatePanel(true)
  }

  return (
    <div className="toggleButton" style={{ backgroundColor: color }}>
      {(backendCall !== "joinGameByID" && 
        <button className="toggleButton" style={{ backgroundColor: color }}
        onClick={() => handleButtonClick() }
      >
        {text}
      </button>)}
      {backendCall === "joinGameByID" && (
          <div className="form-game-id">
            <form onSubmit={handleSubmit} className="game-id-container">
              <input className="input-game-id" type="number" value={joinId}
                onChange={(e) => setJoinId(e.target.value)} />
              <button type="submit" className="button-game-id"><FontAwesomeIcon icon={faArrowRight}/></button>
            </form>
          </div>
      )}
    </div>
  );
};
export default MenuButtonComponent;
