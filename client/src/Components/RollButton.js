import React from 'react'; // Import React
import logo from '../logo.svg';
import '../App.css';


const RollButton = () => {
    dice1 = new Dice();
    dice2 = new Dice();
    totalRoll = 0;
    const handleClick = () => {
        dice1.rollDice();
        dice2.rollDice();
        totalRoll = dice1.DiceState + dice2.DiceState;
    };

    return (
        <div style={{width: 78, height: 45, position: 'relative'}}>
            <div style={{width: 78, height: 45, left: 0, top: 0, position: 'absolute', background: '#C3332B', borderRadius: 25}} />
            <div style={{width: 76, height: 42, left: 1, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>roll</div>
        </div>
    )
};