import React, { useState } from "react";
import '../Styles/RollButton.css'

const RollButton = () => {
    // const dice1 = new Dice();
    // const dice2 = new Dice();
    
    async function handleClick() {
        const response = await fetch('https://localhost:5000/rollButtonClicked');
        const json = await response.json();
        console.log(json);
    }

    return (
        <button className='button rollButton' onClick={handleClick}>
            roll
        </button>

    )
};

export default RollButton;