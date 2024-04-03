import React, { useState } from "react";
import "../Styles/RoomCreation.css";
import { Player } from "@shared/types";

export interface CreateRoomProp {
  color: string;

  text: string;
}

const CreateRoomComponent = (props: CreateRoomProp) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);

  const toggleRoomCreation = () => setIsCreatingRoom(!isCreatingRoom);

  return (
    <button
      className="createRoom"
      onClick={() => toggleRoomCreation}
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </button>
  );
};
export default CreateRoomComponent;
