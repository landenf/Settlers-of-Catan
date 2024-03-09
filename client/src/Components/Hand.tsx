import React from "react";
import ResourceCard from "./ResourceCard";
import "../Styles/hand.css";

/**
 * Component that displays the amount of victory points a player has as well as
 * the numbers of all 5 resource cards and the number of development cards currently
 * in a player's hand
 *
 * @returns all cards in hand and victory points
 */
const Hand = () => {
  /**
   *get player resources
   */

  let resources = [
    { Name: "sheep", Value: 1 },
    { Name: "wheat", Value: 1 },
    { Name: "wood", Value: 1 },
    { Name: "brick", Value: 1 },
    { Name: "stone", Value: 1 },
  ];
  const getResources = () => {};

  return (
    <div className="personalCards" style={{ position: "relative" }}>
      <div
        className="victoryPoints"
        style={{ width: 134, height: 118, position: "relative" }}
      >
        <div className="victoryPointBackground" />
        <div className="victoryPointsLabel">7</div>
        <div className="victoryPointsNumber">victory points</div>
      </div>
      {/** Makes a card for each resource */}
      {resources.map((resource) => {
        return <ResourceCard type={resource.Name} Value={resource.Value} />;
      })}

      <ResourceCard type="developmentCard" Value={1} />
    </div>
  );
};

export default Hand;
