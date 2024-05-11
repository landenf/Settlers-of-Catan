import React, { useState } from "react";
import '../../../Styles/Gameplay/Player/PlayerComponent.css';
import { LimitedPlayer } from "@shared/types";

/**
 * A component corresponding to a specific Catan player.
 * @param player A player type. Holds necessary render information including 
 * total VP, resources, and avatar.
 * @returns a front-end component representing a player and their current stats.
 */
const PlayerComponent = (player: LimitedPlayer) => {

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
                <img src={player.image} className={avatar_color}></img>
                <div>
                    <p className="heading">{player_name}</p>
                    <div className="statContainer">
                        <div className="statBox" >
                            <p className="statHeading">{player_vp}</p>
                            <div className="statText">Victory Points</div>
                        </div>
                        <div className="statBox">
                            <p className="statHeading">{player_resources}</p>
                            <div className="statText">Resources</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="playerAwards">
                <img src="/images/temp_road.png" className={player.hasMostRoads ? "" : "hidden"}></img>
                <img src="/images/temp_knight.png" className={player.hasLargestArmy ? "" : "hidden"}></img>
            </div>
        </div>
    )
}
export default PlayerComponent;