import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData";
import PlayerBarComponent from "../Components/PlayerBarComponent.tsx";
import ActionsBarComponent from "../Components/ActionsBarComponent.tsx";
import RollButton from '../Components/RollButton.tsx';
const GameSession = () => {
  return (
    <div>
      <RollButton></RollButton>
      <GameBoard />
      <PlayerBarComponent players={players}></PlayerBarComponent>
      <ActionsBarComponent></ActionsBarComponent>
    </div>

  );
};
export default GameSession;
