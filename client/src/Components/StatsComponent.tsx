import React from "react";
import "../Styles/Stats.css";
import { Player } from "@backend/types";
const StatsComponent = (props: Player) => {
  let statLabels = [
    { name: "Games Won: ", value: 1 },
    { name: "Largest Army: ", value: 2 },
    { name: "Most Roads: ", value: 3 },
    { name: "Total VPs: ", value: 4 },
    { name: "Total Wheat: ", value: 5 },
    { name: "Total Rock: ", value: 6 },
    { name: "Total Wood: ", value: 7 },
    { name: "Total Brick: ", value: 8 },
    { name: "Total Sheep: ", value: 9 },
  ];

  return (
    <div className="Profile">
      <div className="backgroundRectangle" />
      <div className="avatar">
        {" "}
        <img src={props.image} alt="Avatar Image" />
      </div>
      <div className="stats">
        {props.stats.map((label: {}) => {
          {
            label.name + label.value;
          }
        })}
      </div>
      <div className="playerName">STEVE</div>
    </div>
  );
};

export default StatsComponent;
