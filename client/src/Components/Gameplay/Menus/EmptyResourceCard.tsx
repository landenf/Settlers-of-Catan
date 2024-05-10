import React from "react";
import { useState } from "react";
import "../../../Styles/Gameplay/Player/Hand.css"
import { TradeParams } from "../../../Enums/tradebody";

/**
 * An interface that provides strong typing to a resource card prop.
 */
interface EmptyResourceCardProp {

  /**
   * Represents the card's resource type
   */
  type: string;

  /**
   * Determines if a card in this row has been selected or not.
   */
  cardIsSelected: boolean;

  /**
   * Function to set card selection on/off in this row.
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

  /**
   * Function to set the card if there is not one already set
   * in this row.
   */
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

  /**
   * Updates the trade parameters.
   * @param newParam the new resource to offer or gain
   */
  const updateTradeParams = (newParam: string) => {

    if (tradeType == "offer") {
        tradeParameters.offer = newParam;
    } else {
        tradeParameters.gain = newParam;
    }
  }

  return (
    <div className={"resourceCard empty " + (isSelected ? "selected" : "")} onClick={() => setIfNoSelection()}>
      <p className={"resources-to-give-label " + (isSelected ? "" : "disabled")}>{tradeType === "offer" ? "3" : "1"}</p>
      <img className="resourceImage" src={`./images/resources/${cardType}.jpg`} alt={cardType} />
    </div>
  );
};

export default EmptyResourceCard;
