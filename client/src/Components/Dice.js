import React from 'react'; // Import React
import logo from '../logo.svg';
import '../App.css';

const Dice = () => {
    DiceState = 1;

    function rollDice() {
        this.DiceState = Math.floor(Math.random() * 6) + 1;

        switch(this.DiceState) {
            case 1:
                return <div className="dice-1" width='34' height='30' href='./images/dice/1.png'></div>
            case 2:
                return <div className="dice-2" width='34' height='30' href='./images/dice/2.png'></div>
            case 3:
                return <div className="dice-3" width='34' height='30' href='./images/dice/3.png'></div>
            case 4:
                return <div className="dice-4" width='34' height='30' href='./images/dice/4.png'></div>
            case 5:
                return <div className="dice-5" width='34' height='30' href='./images/dice/5.png'></div>
            case 6:
                return <div className="dice-6" width='34' height='30' href='./images/dice/6.png'></div>
            default:
                return <div>Error: Invalid Roll</div>

        }
    }
    
}