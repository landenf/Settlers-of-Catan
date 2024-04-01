import React, { useState } from "react";
import '../Styles/RollButton.css'
import { GameState } from "@shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

/**
* An interface that provides strong typing to a gamestate passed to the roll
*/
export interface RollButtonProps {
    updateState: (newState: GameState) => void;
}

const RollButton: React.FC<RollButtonProps> = ({ updateState }) => {
    
    /**
     * Function used to call the backend to roll the dice and distribute resources.
     */
    async function handleClick() {
        // call backend
        const response = await fetch('http://localhost:5000/rollButtonClicked', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        // interpret the new gamestate and update the frontend rendering
        let newState = await response.json();
        updateState(newState);
    }

    return (
        <button className='button rollButton' onClick={handleClick}>
            <FontAwesomeIcon icon={faDice} />
        </button>

    )
};

export default RollButton;