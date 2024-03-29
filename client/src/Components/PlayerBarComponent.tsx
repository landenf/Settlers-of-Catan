import React from "react";
import PlayerComponent from "./PlayerComponent";
import { Player } from "@backend/types"
import '../Styles/PlayerBarComponent.css';

/**
 * An interface that provides strong typing to a list of players as a prop.
 */
export interface PlayerBarProp {
    /**
     * A list of players.
     */
    players: Player[];
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
    const players = props.players.map((player: Player) =>

        <PlayerComponent 
            key={player.id}
            id={player.id}
            name={player.name}
            image={player.image}
            color={player.color}
            vp={player.vp}
            resources={player.resources}
            hand={player.hand}
            communities_owned={[]}
            potential_communities={[]}
            roads_owned={[]}
            potential_roads={[]}
            player_stats={player.player_stats} 
            resource_gain={player.resource_gain}        
        />

    );

    return(
        <ul>{players}</ul>
    )
} 
export default PlayerBarComponent;