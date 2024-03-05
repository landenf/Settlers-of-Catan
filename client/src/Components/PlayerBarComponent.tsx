import React from "react";
import PlayerComponent from "./PlayerComponent";
import '../Styles/PlayerBarComponent.css';

/**
 * A React component representing a list of players to be rendered on the left
 * side of the screen. 
 * @param props an object holding a list of players
 * @returns a front-end component representing up to four players
 */
const PlayerBarComponent = (props: any) => {

    /**
     * A list of players to be rendered through the player bar component.
     * TODO: Clean up "any" declarations in a future PR dedicated to making types.
     */
    const players = props.players.map((player: { name: any; image: any; color: any; vp: any; resources: any; }) =>

        <PlayerComponent
            name = {player.name}
            image = {player.image}
            color = {player.color}
            vp = {player.vp}
            resources = {player.resources}>
        </PlayerComponent>

    );

    return(
        <ul>{players}</ul>
    )
} 
export default PlayerBarComponent;