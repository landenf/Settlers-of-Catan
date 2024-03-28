import React from "react";
import { useState } from "react";
import { ResourceCardProp } from "./types";

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
