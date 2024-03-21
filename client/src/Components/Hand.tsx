import React from "react";
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
  const player = props.gamestate.current_player;
  let resources = [
    { name: "sheep", value: player.hand["sheep"]},
    { name: "wheat", value: player.hand["wheat"] },
    { name: "wood", value: player.hand["wood"] },
    { name: "brick", value: player.hand["brick"] },
    { name: "stone", value: player.hand["stone"] },
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
