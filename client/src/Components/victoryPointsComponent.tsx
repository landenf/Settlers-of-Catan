import React from "react";
import "../Styles/VictoryPointsComponent.css";
/**
 * An interface that provides strong typing to a vp prop.
 */
export interface VPProp {

  /**
   * The current user's score of victory points.
   */
  vp: number
}

/**
 * A red box to display the user's current count of victory points.
 * @param props the amount of victory points the current user has
 */
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
