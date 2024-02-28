export default function DevelopmentCard() {
  const [numCards, setNumCards] = useState(0);

  function getNumCards() {
    setNumCards({
      /** get from user */
    });
  }
  <div
    className="developmentCard"
    style={{
      width: 75,
      height: 94,
      left: 175,
      top: 103,
      position: "absolute",
    }}
  >
    <div
      className="card"
      style={{
        width: 75,
        height: 94,
        left: 0,
        top: 0,
        position: "absolute",
        background: "white",
        borderRadius: 10,
      }}
    />
    <div
      className="cardNumber"
      style={{
        width: 58,
        height: 80,
        left: 7,
        top: 7,
        position: "absolute",
        textAlign: "center",
        color: "black",
        fontSize: 50,
        fontFamily: "Inter",
        fontWeight: "400",
        wordWrap: "break-word",
      }}
    >
      numCards
    </div>
  </div>;
}
