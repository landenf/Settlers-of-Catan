import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData";
import PlayerBarComponent from "../Components/PlayerBarComponent.tsx";
import ActionsBarComponent from "../Components/ActionsBarComponent.tsx";
import Hand from "../Components/Hand.tsx"

const GameSession = () => {
  return (
    <div>
      <GameBoard />
      <PlayerBarComponent players={players}></PlayerBarComponent>
      <ActionsBarComponent></ActionsBarComponent>
      <Hand></Hand>
    </div>
  );
};
export default GameSession;
