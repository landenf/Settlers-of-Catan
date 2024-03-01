import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData.js";
import PlayerbarComponet from '../Components/playerBarComponent.js';
import Dice from "../Components/Dice";
import RollButton from "../Components/RollButton"

const GameSession = () => {
    // const d1 = new Dice();
    // const d2 = new Dice();
    // const roll = new RollButton([d1, d2]);
    return (
        <div>
            <GameBoard/>
            <PlayerbarComponet players={players}></PlayerbarComponet>
            <Dice/>
            <Dice/>
            <RollButton/>
            
        </div>
        
)}
export default GameSession;
