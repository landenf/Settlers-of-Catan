import React from "react";
import '../../../Styles/Gameplay/Player/RollButton.css'
import { LimitedSession } from "@shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { BackendRequest } from "../../../Enums/requests";

/**
* An interface that provides strong typing to a gamestate passed to the roll
*/
interface RollButtonProps {

    /**
     * Function to call the backend through the main websocket.
     */
    callBackend: (type: string, body: BackendRequest) => void;

    /**
     * Determines if the player has rolled this turn or not.
     */
    rolled: boolean;

    /**
     * Updates whenever the player rolls. Prevents the player from
     * rolling twice in a single turn.
     */
    setRolled: (newState: boolean) => void;

    /**
     * Determines if the client is the current player. If not,
     * the roll button shouldn't show up.
     */
    isCurrentPlayer: boolean;

    /**
     * Sent to the backend as metadata.
     */
    state: LimitedSession
}

/**
 * The button component which lets the user roll the dice. Should only be clickable
 * once per turn.
 */
const RollButton: React.FC<RollButtonProps> = ({ callBackend, rolled, setRolled, isCurrentPlayer, state }) => {
    
    /**
     * Function used to call the backend to roll the dice and distribute resources.
     */
    async function handleClick() {
        callBackend("roll", {state})
        setRolled(true)
    }

    return (
        <button aria-label={"rollButton"} className={'rollButton ' + (rolled ? "roll-dark " : " ") + 
            ((isCurrentPlayer && state.roundNumber > 2) ? "" : "disabled")} onClick={handleClick} disabled={rolled}>
            <FontAwesomeIcon icon={faDice} />
        </button>
    )
};

export default RollButton;