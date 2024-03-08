import "../Styles/VictoryPointsComponent.css";

const VictoryPointsComponent = () => {
  return (
    <div
      className="victoryPoints"
      style={{ width: 134, height: 118, position: "relative" }}
    >
      <div className="victoryPointBackground" />
      <div className="victoryPointsNumber">7</div>
      <div className="victoryPointsLabel">victory points</div>
    </div>
  );
};
export default VictoryPointsComponent;
