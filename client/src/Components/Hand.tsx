import "../Styles/hand.css";
import React from "react";
import ResourceCard from "./ResourceCard";

const Hand = () => {
  /**
   *get player resources
   */

  let resources = [
    { name: "sheep", value: 1 },
    { name: "wheat", value: 1 },
    { name: "wood", value: 1 },
    { name: "brick", value: 1 },
    { name: "stone", value: 1 },
  ];
  const getResources = () => {};
  console.log(resources);

  return (
    <div className="personalCards" style={{ position: "relative" }}>
      {/** Makes a card for each resource */}
      {resources.map((resource) => {
        return <ResourceCard type={resource.name} value={resource.value} />;
      })}

      <ResourceCard type="developmentCard" value={1} />
    </div>
  );
};

export default Hand;
