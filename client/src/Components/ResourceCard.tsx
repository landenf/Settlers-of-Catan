import { useState } from "react";
import "../Styles/hand.css";
import React from "react";
import { Card } from "@backend/types";

const ResourceCard = (props: Card) => {
  const [numCards, setNumCards] = useState(0);
  const cardType = props.type;

  function getNumCards() {
    /** get from user */
    // setNumCards();
  }
  return (
    <div
      className="resourceCard"
      style={{ width: 75, height: 94, position: "relative" }}
    >
      <img
        className="resourceImage"
      />

      <div className="backgroundCircle"></div>

      <div className="cardNumber">
        {/** pull from PlayerData.js in Data once Landen's PR is merged */}
        {props.value}
      </div>
    </div>
  );
};

export default ResourceCard;
