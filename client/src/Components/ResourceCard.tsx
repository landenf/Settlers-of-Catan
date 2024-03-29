import React from "react";
import { useState } from "react";

/**
 * An interface that provides strong typing to a resource card prop.
 */
export interface ResourceCardProp {

  /**
   * Represents the card's type (either resource type or dev card)
   */
  type: string;

  /**
   * Represents the count of the resource or dev card in hand.
   */
  value: number;
}

const ResourceCard = (props: ResourceCardProp) => {
  const [numCards, setNumCards] = useState(0);
  const cardType = props.type;
  return (
    <div className="resourceCard" style={{ position: "relative" }} >
    <img className="resourceImage" src={`./images/resources/${cardType}.jpg`} alt={cardType} />
      <div className="backgroundCircle">
        <div className="cardNumber">{props.value}</div>
      </div>
    </div>
  );
};

export default ResourceCard;
