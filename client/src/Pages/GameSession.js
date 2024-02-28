import GameBoard from "../Components/GameBoard";
import { players } from "../StaticData/PlayerData.js";
import PlayerbarComponet from '../Components/playerBarComponent.js';

const GameSession = () => {
    return (
        <div>
            <GameBoard/>
            <PlayerbarComponet players={players}></PlayerbarComponet>
        </div>
)}
export default GameSession;
