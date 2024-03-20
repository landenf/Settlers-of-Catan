import { useState } from "react";

const ResourceCard = (props) => {
  const [numCards, setNumCards] = useState(0);
  const cardType = props.type;

  function getNumCards() {
    setNumCards({
      /** get from user */
    });
  }
  return (
    <div className="resourceCard" style={{ width: 75, height: 94, position: "relative" }} >
    <img className="resourceImage" src={`./images/resources/${cardType}.jpg`} alt={cardType} />
      <div className="backgroundCircle"></div>
      <div className="cardNumber">
        {props.Value}
      </div>
    </div>
  );
};

export default ResourceCard;
