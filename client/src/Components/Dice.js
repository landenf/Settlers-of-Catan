import React, { useState } from "react";
import logo from '../logo.svg';

const Dice = () => {
    const DiceState = 1;
    const imgUrl = `../images/dice/${DiceState}.png`;
    function roll () {
        this.DiceState = Math.floor(Math.random() * 6) + 1;
        this.imgUrl = `./images/dice/${DiceState}.png`
    };
    return (
        <div id="dice" width='34' height='30'>
            <img src={imgUrl}></img>
        </div>
    );
    
};
export default Dice;