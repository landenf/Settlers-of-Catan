import React from 'react'; // Import React
import logo from '../logo.svg';
import '../App.css';

const Dice = () => {
    DiceState = 1;
    imgUrl = "";

    rollDice() = () => {
        this.DiceState = Math.floor(Math.random() * 6) + 1;
        this.imgUrl = './images/dice/' + {DiceState} + '.png';
    };

    return (
        <div id="dice" width='34' height='30' href={this.imgUrl}></div>
    );
    
};