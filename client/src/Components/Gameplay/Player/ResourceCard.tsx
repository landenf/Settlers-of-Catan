import React from "react";

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

/**
 * A component representing a single type of resource card with resource counts
 */
const ResourceCard = (props: ResourceCardProp) => {
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
