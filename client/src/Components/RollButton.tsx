import React, { useState } from "react";
import '../Styles/RollButton.css'
import { GameState, LimitedSession } from "@shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { BackendRequest } from "../Enums/requests";

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
    updateRolled: (newState: boolean) => void;

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

const RollButton: React.FC<RollButtonProps> = ({ callBackend, rolled, updateRolled, isCurrentPlayer, state }) => {
    
    /**
     * Function used to call the backend to roll the dice and distribute resources.
     */
    async function handleClick() {
        callBackend("roll", {state})
        updateRolled(true)
    }

    return (

        <button aria-label={"rollButton"} className={'rollButton ' + (rolled ? "roll-dark " : " ") + 
            (isCurrentPlayer ? "" : "disabled")} onClick={handleClick} disabled={rolled}>
            <FontAwesomeIcon icon={faDice} />
        </button>

    )
};

export default RollButton;