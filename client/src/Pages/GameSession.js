import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData";
import PlayerBarComponent from "../Components/PlayerBarComponent.tsx";
import ActionsBarComponent from "../Components/ActionsBarComponent.tsx";
import MenuComponent from "../Components/MenuComponent.tsx";
import StatsComponent from "../Components/StatsComponent.tsx";

const GameSession = () => {
  return (
    <div>
      <StatsComponent player={players[0]} />
    </div>
  );
};
export default GameSession;
