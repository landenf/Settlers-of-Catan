import GameBoard from "../Components/GameBoard";
import Dice from "../Components/Dice";
import RollButton from "../Components/RollButton"

const GameSession = () => {
    // const d1 = new Dice();
    // const d2 = new Dice();
    // const roll = new RollButton([d1, d2]);
    return (
        <div>
            <GameBoard/>
            <Dice/>
            <Dice/>
            <RollButton/>
            
        </div>
        
)}

export default GameSession;
