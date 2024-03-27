import React from "react";
import PlayerComponent from "./PlayerComponent";
import { Player } from "@backend/types";
import { BarProp } from "./types";
import "../Styles/PlayerBarComponent.css";

/**
 * A React component representing a list of players to be rendered on the left
 * side of the screen.
 * @param props an object holding a list of players
 * @returns a front-end component representing up to four players
 */
const PlayerBarComponent = (props: BarProp) => {
  /**
   * A list of players to be rendered through the player bar component.
   */

  const players = props.players.map((player: Player) => (
    <PlayerComponent
      key={player.id}
      id={player.id}
      name={player.name}
      image={player.image}
      color={player.color}
      vp={player.vp}
      resources={player.resources}
      stats={player.stats}
    />
  ));

  return <ul>{players}</ul>;
};
export default PlayerBarComponent;
