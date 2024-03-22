import React from "react";
import "../Styles/VictoryPointsComponent.css";
import { Player } from "@backend/types";
import { VPProp } from "./types";

const VictoryPointsComponent = (props: VPProp) => {
  return (
    <div className="victoryPoints">
      <div className="victoryPointBackground" />
      <div className="victoryPointsLabel">victory points</div>
      <div className="victoryPointsNumber">{props.vp}</div>
    </div>
  );
};
export default VictoryPointsComponent;
