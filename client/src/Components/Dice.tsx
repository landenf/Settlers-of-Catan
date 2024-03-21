import React, { useState } from "react";

const Dice = () => {
    const [DiceState, setDiceState] = useState(1);
    const imgUrl = `./images/dice/${DiceState}.png`;

    //figure out where this logic goes later
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