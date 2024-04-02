import React, { useState } from "react";
import "../Styles/RoomCreation.css";
import { Player } from "@shared/types";

/**
 * A React component corresponding to a specific Catan player. Created using
 * information gathered from its prop, a player type. Displays character color,
 * avatar, total VP, total resources, and current game awards.
 * @param player A player type. Holds necessary render information including
 * total VP, resources, and avatar.
 * @returns a front-end component representing a player and their current stats.
 */
const CreateRoomComponent = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);

  const toggleRoomCreation = () => setIsCreatingRoom(!isCreatingRoom);

  return (
    <button
      className="createRoom"
      onClick={() => toggleRoomCreation}
      style={{ width: 390, height: 90, position: "relative" }}
    >
      CREATE ROOM
    </button>
  );
};
export default CreateRoomComponent;
