import React, { useState } from "react";

/**
 * The dice component rendered in the center of the screen. It should
 * roll every turn.
 */
const Dice = () => {
    const [DiceState, setDiceState] = useState(1);
    const imgUrl = `./images/dice/${DiceState}.png`;

    return (
        <div id="dice">
            <img src={imgUrl}></img>
        </div>
    );
    
};
export default Dice;