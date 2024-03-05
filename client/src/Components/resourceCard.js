import { useState } from "react";
import "./hand.css";

const ResourceCard = (props) => {
  const [numCards, setNumCards] = useState(0);
  const cardType = props.type;

  function getNumCards() {
    setNumCards({
      /** get from user */
    });
  }
  return (
    <div
      className="resourceCard"
      style={{ width: 75, height: 94, position: "relative" }}
    >
      <img
        className="resourceImage"
        src="../public/images/resources/{props.type}.jpg"
      />

      <div className="backgroundCircle"></div>

      <div className="cardNumber">
        {/** pull from PlayerData.js in Data once Landen's PR is merged */}
        {props.Value}
      </div>
    </div>
  );
};

export default ResourceCard;
