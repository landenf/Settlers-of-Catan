import React, { useState } from "react";
import '../Styles/RollButton.css'
import { GameState } from "@shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

/**
* An interface that provides strong typing to a gamestate passed to the roll
*/
interface RollButtonProps {
    updateState: (newState: GameState) => void;
    rolled: boolean;
    updateRolled: (newState: boolean) => void;
    isCurrentPlayer: boolean;
}

const RollButton: React.FC<RollButtonProps> = ({ updateState, rolled, updateRolled, isCurrentPlayer }) => {
    
    /**
     * Function used to call the backend to roll the dice and distribute resources.
     */
    async function handleClick() {
        // call backend
        const response = await fetch('http://localhost:5000/roll', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        // interpret the new gamestate and update the frontend rendering
        let newState = await response.json();
        updateState(newState);
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