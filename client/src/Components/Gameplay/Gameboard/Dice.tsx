import React from "react"
import "../../../Styles/Gameplay/Gameboard/Dice.css"
import SingleDie from "./SingleDie";

/**
 * Interface providing strong typing to dice props.
 */
interface DiceProp {

    /**
     * The number rolled by the current player.
     */
    numberRolled: {number1: number, number2: number};
}

/**
 * The combination of both dice in the center of the screen.
 */
const Dice = (props: DiceProp) => {

    var die1Number = props.numberRolled.number1;
    var die2Number = props.numberRolled.number2;

    return (
        <div className="dice">
            <SingleDie displayNumber={die1Number}></SingleDie>
            <div></div>
            <SingleDie displayNumber={die2Number}></SingleDie>
        </div>
    );
}; 
export default Dice;