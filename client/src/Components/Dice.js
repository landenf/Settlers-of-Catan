import React, { useState } from "react";
import logo from '../logo.svg';

const Dice = () => {
    const [DiceState, setDiceState] = useState(1);
    const imgUrl = `./images/dice/${DiceState}.png`;

    //figure out where this logic goes later
    function roll () {
        newDiceValue = Math.floor(Math.random() * 6) + 1;
        setDiceState(newDiceValue);
        imgUrl = `./images/dice/${DiceState}.png`
    };
    return (
        <div id="dice" width='34' height='30'>
            <img src={imgUrl}></img>
        </div>
    );
    
};
export default Dice;