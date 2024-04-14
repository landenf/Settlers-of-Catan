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
    rolled: boolean;
    updateRolled: (newState: boolean) => void;
    isCurrentPlayer: boolean;
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
        <button className={'rollButton ' + (rolled ? "roll-dark " : " ") + (isCurrentPlayer ? "" : "disabled")} 
        onClick={handleClick} disabled={rolled}>
            <FontAwesomeIcon icon={faDice} />
        </button>

    )
};

export default RollButton;