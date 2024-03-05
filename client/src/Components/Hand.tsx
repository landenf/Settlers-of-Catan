import "../Styles/hand.css";
import React from "react";
import ResourceCard from "./ResourceCard";

const Hand = () => {
  /**
   *get player resources
   */

  let resources = [
    { Name: "sheep", Value: 1 },
    { Name: "wheat", Value: 1 },
    { Name: "wood", Value: 1 },
    { Name: "brick", Value: 1 },
    { Name: "stone", Value: 1 },
  ];
  const getResources = () => {};
  console.log(resources);

  return (
    <div className="personalCards" style={{ position: "relative" }}>
      {/** Makes a card for each resource */}
      {resources.map((resource) => {
        return <ResourceCard type={resource.Name} Value={resource.Value} />;
      })}

      <ResourceCard type="developmentCard" Value={1} />
    </div>
  );
};

export default Hand;
