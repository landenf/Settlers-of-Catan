import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData";
import PlayerBarComponent from "../Components/PlayerBarComponent.tsx";
import ActionsBarComponent from "../Components/ActionsBarComponent.tsx";

const GameSession = () => {
  return (
    <div>
      <GameBoard />
      <PlayerBarComponent players={players}></PlayerBarComponent>
      <ActionsBarComponent></ActionsBarComponent>
    </div>
  );
};
export default GameSession;
