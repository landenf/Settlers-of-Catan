import React, { useState } from "react";
import logo from '../logo.svg';
import { Dice } from './Dice.js';


const RollButton = () => {
    // const dice1 = new Dice();
    // const dice2 = new Dice();
    const totalRoll = 0;
    const handleClick = () => {
        // dice[0].roll();
        // dice[1].roll();

        // totalRoll = dice[0].DiceState + dice[1].DiceState;
    };

    return (
        <div style={{width: 78, height: 45, position: 'relative'}}>
            <div style={{width: 78, height: 45, left: 0, top: 0, position: 'absolute', background: '#C3332B', borderRadius: 25}} />
            <div style={{width: 76, height: 42, left: 1, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>roll</div>
        </div>
    )
};

export default RollButton;