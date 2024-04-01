import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import "../Styles/hand.css"
import { GameState, Player } from "@shared/types";

/**
 * An interface that provides strong typing to a game session's game state prop.
 */
export interface StateProp {
  /**
   * The current game session's state.
   */
  gamestate: GameState
}

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
  const hand = props.gamestate.current_player.hand;

  /**
   * the set of resources this player holds
   */
  let resources = [
    { name: "sheep", value: hand["sheep"]},
    { name: "wheat", value: hand["wheat"] },
    { name: "wood", value: hand["wood"] },
    { name: "brick", value: hand["brick"] },
    { name: "stone", value: hand["stone"] },
  ];

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
