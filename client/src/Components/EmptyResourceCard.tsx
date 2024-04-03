import React from "react";
import { useState } from "react";
import "../Styles/hand.css"
import { TradeParams } from "../Enums/tradebody";

/**
 * An interface that provides strong typing to a resource card prop.
 */
interface EmptyResourceCardProp {

  /**
   * Represents the card's type (either resource type or dev card)
   */
  type: string;

  /**
   * Determines if a card in this row has been selected or not.
   */
  cardIsSelected: boolean;

  /**
   * Set true if a card in this row has been selected.
   */
  setCardIsSelected: (newState: boolean) => void;

  /**
   * Function used to update the trade parameters.
   */
  setTradeParams: (newParams: TradeParams) => void;

  /**
   * The current trade parameters.
   */
  tradeParameters: TradeParams

  /**
   * The type of resource being traded, whether its offered or
   * being received.
   */
  tradeType: string;

}

const EmptyResourceCard: React.FC<EmptyResourceCardProp> = ({ type, cardIsSelected, setCardIsSelected, tradeType, tradeParameters }) => {
  const [numCards, setNumCards] = useState(0);
  const cardType = type;
  const [isSelected, setSelected] = useState(false);

  const setIfNoSelection = () => {
    if (!isSelected && !cardIsSelected) {
      setSelected(true)
      setCardIsSelected(true)
      updateTradeParams(cardType)
    } else if (isSelected) {
      setSelected(false)
      setCardIsSelected(false)
      updateTradeParams("")
    }
  }

  const updateTradeParams = (newParam: string) => {

    if (tradeType == "offer") {
        tradeParameters.offer = newParam;
    } else {
        tradeParameters.gain = newParam;
    }
  }

  return (
    <div className={"resourceCard empty " + (isSelected ? "selected" : "")} style={{ position: "relative"}} onClick={() => setIfNoSelection()}>
    <img className="resourceImage" src={`./images/resources/${cardType}.jpg`} alt={cardType} />
      </div>
  );
};

export default EmptyResourceCard;
