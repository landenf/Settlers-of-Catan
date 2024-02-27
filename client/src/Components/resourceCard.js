import "./resourceCard.css";
import { useState } from "react";

export default function ResourceCard({ type }) {
  const [numCards, setNumCards] = useState(0);

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
        style={{
          width: 75,
          height: 94,
          left: 0,
          top: 0,
          position: "absolute",
          borderRadius: 8,
          border: "1px #FCF8F8 solid",
        }}
        /** reference image in GameBoardStatic.js when Landen's merges */
        src="https://via.placeholder.com/75x94"
      />

      <div
        className="backgroundCircle"
        style={{
          width: 43,
          height: 43,
          left: 16,
          top: 25,
          position: "absolute",
          background: "white",
        }}
      ></div>

      <div
        className="cardNumber"
        style={{
          width: 51,
          height: 72,
          left: 12,
          top: 11,
          position: "absolute",
          textAlign: "center",
          color: "black",
          fontSize: 35,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        {/** pull from PlayerData.js in Data once Landen's PR is merged */}
        {numCards}
        numCards
      </div>
    </div>
  );
}
