import React from "react";
import ResourceCard from "./ResourceCard";
import "../Styles/hand.css"

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
    { name: "sheep", value: 1 },
    { name: "wheat", value: 1 },
    { name: "wood", value: 1 },
    { name: "brick", value: 1 },
    { name: "stone", value: 1 },
  ];
  const getResources = () => {};

  return (
    <div className="personalCards">
      {/** Makes a card for each resource */}
      {resources.map((resource) => {
        return <ResourceCard type={resource.name} value={resource.value} />;
      })}

      <ResourceCard type="developmentCard" value={1} />
    </div>
  );
};

export default Hand;
