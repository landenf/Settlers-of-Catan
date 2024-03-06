import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData";
import PlayerBarComponent from "../Components/PlayerComponent.tsx"
import ActionsBarComponent from "../Components/ActionsBarComponent.js";

const GameSession = () => {
    // const d1 = new Dice();
    // const d2 = new Dice();
    // const roll = new RollButton([d1, d2]);
    return (
        <div>
            <GameBoard/>
            <PlayerBarComponent players={players}/>
            <ActionsBarComponent></ActionsBarComponent>
        </div>
        
)}
export default GameSession;
