import React from "react";
import "../Styles/Menu.css";

const MenuComponent = () => {
  return (
    <div
      className="menu"
      style={{ width: 720, height: 881, position: "relative" }}
    >
      <div className="background" />
      <div className="title">CATAN</div>
      <div className="createRoom">
        <div className="createRoomButton" />
        <div className="createRoomText">CREATE ROOM</div>
      </div>
      <div className="onlineRoom">
        <div className="onlineRoomButton" />
        <div className="onlineRoomText">JOIN ONLINE ROOM</div>
      </div>
      <div className="joinCode">
        <div className="joinCodeButton" />
        <div className="joinCodeText">{"JOIN CODE: _______ -->"}</div>
      </div>
    </div>
  );
};
export default MenuComponent;
