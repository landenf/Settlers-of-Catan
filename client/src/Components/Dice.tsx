import React, { useState } from "react";

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