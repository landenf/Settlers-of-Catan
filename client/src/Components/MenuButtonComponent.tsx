import React, { useState } from "react";
import "../Styles/MenuOptions.css";
import { BackendRequest } from "../Enums/requests";
import { LimitedSession } from "@shared/types";

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
}

/**
 * Creates a single button to toggle between on the
 * side menu (Landing Page).
 *
 * @param props color and text of the button.
 * @returns toggle button
 */
const MenuButtonComponent: React.FC<CreateRoomProp> = ({callBackend, state, color, text, setCreatePanel}) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);

  const toggleRoomCreation = () => setIsCreatingRoom(!isCreatingRoom);

  const handleClick = () => {
    callBackend("generateGame", {state: state})
    setCreatePanel(true)
  }

  return (
    <button
      className="toggleButton"
      onClick={() => handleClick() }
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};
export default MenuButtonComponent;
