import React from "react";
import PlayerComponent from "./PlayerComponent";
import { Player } from "@backend/types"
import { BarProp } from "./types";
import '../Styles/PlayerBarComponent.css';

/**
 * A React component representing a list of players to be rendered on the left
 * side of the screen. 
 * @param props an object holding a list of players
 * @returns a front-end component representing up to four players
 */
const PlayerBarComponent = (props: BarProp) => {

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
            hand={{
                wheat: 0,
                brick: 0,
                stone: 0,
                sheep: 0,
                wood: 0
            }}
            communities_owned={[]}
            potential_communities={[]}
            roads_owned={[]}
            potential_roads={[]}
            player_stats={{
                total_wins: 0,
                largest_armies: 0,
                most_roads: 0,
                total_vp: 0
            }} resource_gain={{
                2: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                3: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                4: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                5: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                6: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                8: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                9: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                10: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                11: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                },
                12: {
                    wheat: 0,
                    brick: 0,
                    stone: 0,
                    sheep: 0,
                    wood: 0
                }
            }}        />

    );

    return(
        <ul>{players}</ul>
    )
} 
export default PlayerBarComponent;