import ResourceCard from "./resourceCard";
import Resources from "../Enums/resources";
import DevelopmentCard from "./developmentCard";

export default function Hand() {
  <div
    className="PersonalCards"
    style={{ width: 250, height: 197, position: "relative" }}
  >
    <DevelopmentCard />

    {/** Makes a card for each resource */}
    {Object.values(Resources).map((resourceId) => {
      return <ResourceCard type={resourceId} />;
    })}
  </div>;
}
