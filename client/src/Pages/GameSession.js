import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData";
import PlayerBarComponent from "../Components/PlayerBarComponent.tsx";
import ActionsBarComponent from "../Components/ActionsBarComponent.tsx";
import Hand from "../Components/Hand.tsx"
import { tiles } from "../StaticData/GameBoardStatic.ts";

const GameSession = () => {
  return (
    <div>
      <GameBoard tiles={tiles}/>
      <PlayerBarComponent players={players}></PlayerBarComponent>
      <ActionsBarComponent></ActionsBarComponent>
      <Hand></Hand>
    </div>
  );
};
export default GameSession;
