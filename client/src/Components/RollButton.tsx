import React, { useState } from "react";
import '../Styles/RollButton.css'
import { GameState } from "@backend/types";

interface RollButtonProps {
    updateState: (newState: GameState) => void;
}
const RollButton: React.FC<RollButtonProps> = ({ updateState }) => {
    
    async function handleClick() {
        console.log("hello");
        const response = await fetch('http://localhost:5000/rollButtonClicked', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let newState = await response.json();
        updateState(newState);
        console.log(newState);
    }

    return (
        <button className='button rollButton' onClick={handleClick}>
            roll
        </button>

    )
};

export default RollButton;