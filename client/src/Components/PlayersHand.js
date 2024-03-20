import ResourceCard from "./resourceCard";
import Resources from "../Enums/resources";
import "../Styles/hand.css";

//Lots of hardcoding in this component that needs to be eventually grabbing values.
const PlayersHand = () => {

  let resources = [
    { Name: "sheep", Value: 1 },
    { Name: "wheat", Value: 3 },
    { Name: "wood", Value: 5 },
    { Name: "brick", Value: 3 },
    { Name: "rock", Value: 6 },
  ];
  const getResources = () => {
    console.log(resources);
  };

  return (
    <div className="personalCards" style={{ position: "relative" }}>
      {resources.map((resource) => {
        return <ResourceCard type={resource.Name} Value={resource.Value} />;
      })}

      <ResourceCard type="developmentcard" Value={1} />
    </div>
  );
};

export default PlayersHand;
