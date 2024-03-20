import React from "react";
import "../Styles/Stats.css";
import { Player } from "@backend/types";
const StatsComponent = (props: Player) => {
  let statLabels = [
    "Games Won: ",
    "Largest Army: ",
    "Most Roads: ",
    "Total VPs: ",
    "Total Wheat: ",
    "Total Rock: ",
    "Total Wood: ",
    "Total Brick: ",
    "Total Sheep: ",
  ];

  return (
    <div
      className="Profile"
      style={{ width: 470, height: 643, position: "relative" }}
    >
      <div className="backgroundRectangle" />
      <div className="avatar">
        {" "}
        <img src="client/public/images/avatar.jpg" alt="Avatar Image" />
      </div>
      <div className="stats">
        {statLabels.map((label) => label)}
        Games Won: 27
        <br />
        Largest Army: 4<br />
        Most Roads: 15
        <br />
        Total VP: 300
        <br />
        Total Wheat: 1230
        <br />
        Total Rock: 856
        <br />
        Total Wood: 732
        <br />
        Total Brick: 877
        <br />
        Total Sheep: 1222{" "}
      </div>
      <div className="playerName">STEVE</div>
    </div>
  );
};

export default StatsComponent;
