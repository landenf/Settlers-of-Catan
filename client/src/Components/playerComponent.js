import React from "react";
import '../Styles/PlayerComponent.css';

const PlayerComponent = (props) => {
    
    const player_image = `/images/${props.image}.jpg`

    return(
        <div className="playerBox">
            <img src={player_image} className="avatar"></img>
            <div>
                <p className="heading">player 1</p>
                <div className="statContainer">
                    <div className="statBox">
                        <p className="statHeading">0</p>
                        <div>Victory Points</div>
                    </div>
                    <div className="statBox">
                        <p className="statHeading">0</p>
                        <div>Resources</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlayerComponent;