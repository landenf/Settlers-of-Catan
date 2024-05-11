import React from "react";
import "../../../Styles/Gameplay/Player/VictoryPointsComponent.css";

/**
 * An interface that provides strong typing to a vp prop.
 */
export interface VPProp {

  /**
   * The current user's score of victory points.
   */
  vp: number

  /**
   * The current player's designated color.
   */
  color: string
}

/**
 * A red box to display the user's current count of victory points.
 * @param props the amount of victory points the current user has
 */
const VictoryPointsComponent = (props: VPProp) => {
  return (
    <div className="victoryPoints">
      <div className="victoryPointBackground" style={{ background: props.color }}/>
      <div className="victoryPointsLabel">victory points</div>
      <div className="victoryPointsNumber">{props.vp}</div>
    </div>
  );
};
export default VictoryPointsComponent;
