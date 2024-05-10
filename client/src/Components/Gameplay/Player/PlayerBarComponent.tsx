import React from "react";
import PlayerComponent from "./PlayerComponent";
import { LimitedPlayer } from "@shared/types"
import '../../../Styles/Gameplay/Player/PlayerBarComponent.css';

/**
 * An interface that provides strong typing to a list of players as a prop.
 */
interface PlayerBarProp {
    /**
     * A list of players.
     */
    players: LimitedPlayer[];
}

/**
 * A React component representing a list of players to be rendered on the left
 * side of the screen. 
 * @param props an object holding a list of players
 */
const PlayerBarComponent = (props: PlayerBarProp) => {

    /**
     * A list of players to be rendered through the player bar component.
     */
    const players = props.players.map((player: LimitedPlayer) =>

        <PlayerComponent 
            key={player.id}
            id={player.id}
            name={player.name}
            image={player.image}
            color={player.color}
            vp={player.vp}
            hasLargestArmy={player.hasLargestArmy}
            hasMostRoads={player.hasMostRoads}
            resources={player.resources}
            ready={player.ready}
            />

    );

    return(
        <ul>{players}</ul>
    )
} 
export default PlayerBarComponent;