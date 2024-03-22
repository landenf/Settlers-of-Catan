import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import "../Styles/hand.css"
import { Player } from "@backend/types";
import { StateProp } from "../Components/types";

/**
 * Component that displays the amount of victory points a player has as well as
 * the numbers of all 5 resource cards and the number of development cards currently
 * in a player's hand
 *
 * @returns all cards in hand and victory points
 */
const Hand = (props: StateProp) => {
  /**
   *get player resources
   */
  const [hand, setHandState] = useState(props.gamestate.current_player.hand);

  let resources = [
    { name: "sheep", value: hand["sheep"]},
    { name: "wheat", value: hand["wheat"] },
    { name: "wood", value: hand["wood"] },
    { name: "brick", value: hand["brick"] },
    { name: "stone", value: hand["stone"] },
  ];
  const getResources = () => {};

  return (
    <div className="personalCards">
      {/** Makes a card for each resource */}
      {resources.map((resource) => {
        return <ResourceCard type={resource.name} value={resource.value} />;
      })}

      <ResourceCard type="developmentCard" value={0} />
    </div>
  );
};

export default Hand;
