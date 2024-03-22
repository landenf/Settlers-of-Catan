import React from "react";
import { useState } from "react";

const ResourceCard = (props: any) => {
  const [numCards, setNumCards] = useState(0);
  const cardType = props.type;
  console.log(props.value)
  return (
    <div className="resourceCard" style={{ position: "relative" }} >
    <img className="resourceImage" src={`./images/resources/${cardType}.jpg`} alt={cardType} />
      <div className="backgroundCircle"></div>
      <div className="cardNumber">{props.value}</div>
    </div>
  );
};

export default ResourceCard;
