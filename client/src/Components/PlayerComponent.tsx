import React, { useState } from "react";
import '../Styles/PlayerComponent.css';

/**
 * A React component corresponding to a specific Catan player. Created using 
 * information gathered from its prop, a player type. Displays character color, 
 * avatar, total VP, total resources, and current game awards.
 * @param player A player type. Holds necessary render information including 
 * total VP, resources, and avatar.
 * @returns a front-end component representing a player and their current stats.
 */
const PlayerComponent = (player) => {
    
    const [isShown, setHover] = useState(false);

    /**
     * The player's avatar URL. TODO: Connect to a database of user images.
     */
    const player_image = `/images/${player.image}.jpg`

    /**
     * The player's screen name.
     */
    const player_name = player.name

    /**
     * The player's in-game color, to be displayed as a border on their 
     * avatar.
     */
    const avatar_color = `avatar ${player.color}`

    /**
     * The player's total count of victory points.
     */
    const player_vp = player.vp

    /**
     * The player's total count of resources.
     */
    const player_resources = player.resources

    return(
        <div>
            <div className="playerBox">
                <img src={player_image} className={avatar_color}></img>
                <div>
                    <p className="heading">{player_name}</p>
                    <div className="statContainer">
                        <div className="statBox" 
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                            {!isShown && (<p className="statHeading">{player_vp}</p>)}
                            {!isShown && (<div className="statText">Victory Points</div>)}
                            {isShown && (<div className="statHoverText">Get 10 Victory Points to win!</div>)}
                        </div>
                        <div className="statBox">
                            <p className="statHeading">{player_resources}</p>
                            <div className="statText">Resources</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="playerAwards">
                <img src="/images/temp_road.png" className="hidden"></img>
                <img src="/images/temp_knight.png" className="hidden"></img>
            </div>
        </div>
    )
}
export default PlayerComponent;