import GameBoard from "../Components/GameBoard.tsx";
import { players } from "../StaticData/PlayerData.ts";
import PlayerBarComponent from '../Components/PlayerBarComponent.tsx';
import Dice from "../Components/Dice.tsx"
import RollButton from "../Components/RollButton.tsx"
import Hand from "../Components/Hand.tsx"

const GameSession = () => {
    // const d1 = new Dice();
    // const d2 = new Dice();
    // const roll = new RollButton([d1, d2]);
    return (
        <div>
            <GameBoard/>
            <PlayerBarComponent players={players}/>
            <Dice/>
            <Dice/>
            <RollButton/>
            
        </div>
        
)}
export default GameSession;
