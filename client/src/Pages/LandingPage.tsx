import React, { useState } from "react";
import "../Styles/LandingPage.css";
import MenuToggleComponent from "../Components/MenuToggleComponent";
import JoinRoomWithCodeComponent from "../Components/JoinRoomWithCodeComponent";
import PlayerStatsComponent from "../Components/PlayerStatsComponent";
import { players } from "../StaticData/PlayerData";

/**
 * Page where the user starts after logging in and sees their individual player stats.
 * From here they can choose to create a game, join an online game, or join an already
 *  existing game with a join code.
 *
 * @returns Landing page for the user.
 */
const LandingPage: React.FC = () => {
  const [isNotInGame, setisNotInGame] = useState(true);

  const toggleGameMode = () => setisNotInGame(!isNotInGame);

  return (
    <div className="landing-page">
      <div className="menu">
        <p className="catanTitle">CATAN</p>
        <MenuToggleComponent />
      </div>
      <PlayerStatsComponent
        key={players[0].id}
        id={players[0].id}
        name={players[0].name}
        image={players[0].image}
        color={players[0].color}
        vp={players[0].vp}
        resources={players[0].resources}
        hand={{
          wheat: 0,
          brick: 0,
          stone: 0,
          sheep: 0,
          wood: 0,
        }}
        hasKnight={false}
        knightCards={0}
        resource_gain={{
          2: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          3: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          4: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          5: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          6: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          8: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          9: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          10: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          11: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
          12: {
            wheat: 0,
            brick: 0,
            stone: 0,
            sheep: 0,
            wood: 0,
          },
        }}
        communities_owned={[]}
        potential_communities={[]}
        roads_owned={[]}
        potential_roads={[]}
        player_stats={{
          total_wins: 0,
          largest_armies: 0,
          most_roads: 0,
          total_vp: 0,
        }}
      />
    </div>
  );
};

export default LandingPage;
