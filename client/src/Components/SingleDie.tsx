import React, { useState } from "react";
import "../Styles/Dice.css"

/**
 * An interface providing strong typing to the die.
 */
interface DieProps {

    /**
     * The number to be displayed on this die.
     */
    displayNumber: number;
}

/**
 * The dice component rendered in the center of the screen.
 */
const SingleDie = (props: DieProps) => {
    const imgUrl = `./images/dice/${props.displayNumber}.png`;

    return (
        <img className="single-die" src={imgUrl}></img>
    );
    
};
export default SingleDie;