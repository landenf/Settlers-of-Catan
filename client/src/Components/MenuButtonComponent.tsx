import React, { useState } from "react";
import "../Styles/MenuOptions.css";

/**
 * Interface to change toggle button styling
 * and text.
 */
export interface CreateRoomProp {
  color: string;

  text: string;
}

/**
 * Creates a single button to toggle between on the
 * side menu (Landing Page).
 *
 * @param props color and text of the button.
 * @returns toggle button
 */
const MenuButtonComponent = (props: CreateRoomProp) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);

  const toggleRoomCreation = () => setIsCreatingRoom(!isCreatingRoom);

  return (
    <button
      className="toggleButton"
      onClick={() => toggleRoomCreation}
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </button>
  );
};
export default MenuButtonComponent;
