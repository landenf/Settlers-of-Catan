import React, { useState } from "react";
import CreateRoomComponent from "./CreateRoomComponent";
import "../Styles/RoomCreation.css";

export interface type {
  color: string;
  text: string;
}

const theme1 = { color: "yellow", text: "CREATE ROOM" };
const theme2 = { color: "red", text: "USE JOIN CODE" };
const theme3 = { color: "white", text: "JOIN ONLINE ROOM" };

export const themes = [theme1, theme2, theme3];

const CreateRoomToggleComponent = () => {
  const [active, setActive] = useState(themes[0]);
  return (
    <div className="parentCreateRoom">
      {themes.map((type) => {
        return <CreateRoomComponent color={type.color} text={type.text} />;
      })}
    </div>
  );
};
export default CreateRoomToggleComponent;
