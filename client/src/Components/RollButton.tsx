import React, { useState } from "react";
import '../Styles/RollButton.css'

const RollButton = () => {
    // const dice1 = new Dice();
    // const dice2 = new Dice();
    
    function handleClick() {
    //     const response = await fetch('http://localhost:5000/rollButtonClicked');
     }

    return (
        <button className='button rollButton' onClick={handleClick}>
            roll
        </button>

    )
};

export default RollButton;