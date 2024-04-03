import React, { useState } from "react";
import "../Styles/hand.css"
import { GameState, Player } from "@shared/types";
import EmptyResourceCard from "./EmptyResourceCard";
import { TradeParams } from "../Enums/tradebody";

/**
 * An interface that provides strong typing to a game session's game state prop.
 */
interface StateProp {
  /**
   * The current game session's state.
   */
  gamestate: GameState

  /**
   * The current trade parameters.
   */
  tradeParameters: TradeParams

  /**
   * Function used to update the trade parameters.
   */
  setTradeParams: (newParams: TradeParams) => void;

  /**
   * The type of resource being traded, whether its offered or
   * being received.
   */
  tradeType: string;
}

/**
 * Component that displays the amount of victory points a player has as well as
 * the numbers of all 5 resource cards and the number of development cards currently
 * in a player's hand
 *
 * @returns all cards in hand and victory points
 */
const EmptyHand: React.FC<StateProp> = ({ gamestate, tradeParameters, setTradeParams, tradeType }) => {

  /**
   *get player resources
   */
  const hand = gamestate.current_player.hand;

  /**
   * the set of resources this player holds
   */
  let resources = [
    { name: "sheep" },
    { name: "wheat" },
    { name: "wood" },
    { name: "brick" },
    { name: "stone" },
  ];

  const [cardIsSelected, setCardIsSelected] = useState(false)

  const updateCardIsSelected = (newState: boolean) => {
    setCardIsSelected(newState)
  }

  return (
    <div className="displayCards">
      {/** Makes a card for each resource */}
      {resources.map((resource) => {
        return <EmptyResourceCard type={resource.name} cardIsSelected={cardIsSelected} setCardIsSelected={updateCardIsSelected} setTradeParams={setTradeParams} tradeType={tradeType} tradeParameters={tradeParameters}/>;
      })}
    </div>
  );
};

export default EmptyHand;
