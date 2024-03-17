import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData.js";
import PlayerbarComponent from '../Components/playerBarComponent.js';
import Dice from "../Components/Dice";
import RollButton from "../Components/RollButton"
import ActionsBarComponent from "../Components/ActionsBarComponent.js";
import '../Styles/GameSession.css';
import PlayersHand from "../Components/PlayersHand.js";

const GameSession = () => {
   
    return (
        <div class="background-container">
            <div className="game-container">
                <div class="PlayerbarComponent"><PlayerbarComponent players={players}/></div>
                <div class="game-board"><GameBoard/><PlayersHand/></div>
                <div class="ActionsBarComponent"><ActionsBarComponent/></div>
            </div>
        </div>   
        
)}
export default GameSession;
