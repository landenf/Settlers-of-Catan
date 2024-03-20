import React, { useState } from "react";

const Dice = () => {
    const [DiceState, setDiceState] = useState(1);
    const imgUrl = `./images/dice/${DiceState}.png`;

    //roll logic has been moved to backend, need to figure out how to update the dice values here
    function roll () {
        const newDiceValue = Math.floor(Math.random() * 6) + 1;
        setDiceState(newDiceValue);
    };
    return (
        <div id="dice">
            <img src={imgUrl}></img>
        </div>
    );
    
};
export default Dice;