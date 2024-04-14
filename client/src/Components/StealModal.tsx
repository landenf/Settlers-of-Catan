import React, { useState } from "react";
import "../Styles/StealModal.css";
import "../Styles/PlayerComponent.css"
import { LimitedSession, LimitedPlayer } from "@shared/types";
import AvatarComponent from "./AvatarComponent";
import { BackendRequest, StealRequest } from "../Enums/requests";

/**
 * Interface providing strong typing to the steal modal props.
 */
interface StealModalProp {

     /**
     * Function to change the modal from being enabled or disabled.
     */
     setStealModal: (newState: boolean) => void;

     /**
      * Whether or not the modal is enabled.
      */
     stealModalState: boolean
 
     /**
      * The current gamestate.
      */
     gamestate: LimitedSession

     /**
     * Function to call the backend through the main websocket.
     */
    callBackend: (type: string, body: BackendRequest) => void;

}

/**
 * Component used to ask the player who they want to steal resources from.
 * Activated when the player receives a knight card.
 */
const StealModal: React.FC<StealModalProp> = ({stealModalState, setStealModal, gamestate, callBackend}) => {

    const [isSelected, updateSelection] = useState(false)
    const [playerSelected, updatePlayerSelection] = useState("")

    /**
     * Function to sort through the gamestate to find the player that matches
     * the given color.
     * @param color the unique color of the player to search
     */
    const locatePlayerIndexByColor = (color: string) => {
        let playerIndex = 0
        for (let i = 0; i < gamestate.players.length; i++) {
            if (color === gamestate.players[i].color) {
                playerIndex = i;
            }
        }
        return playerIndex
    } 

    /**
     * Cancels the stealing portion of the card. Forfeits the 
     * player's abiilty to steal.
     */
    const cancel_steal = () => {
        updateSelection(false);
        updatePlayerSelection("");
        callBackend("cancelSteal", {state: gamestate})
        setStealModal(false)
    }

    /**
     * Function used to call the backend and handle stealing from the
     * given victim.
     */
    const handle_steal = () => {
        let victim = locatePlayerIndexByColor(playerSelected)
        const request: StealRequest = {
            state: gamestate,
            victim: victim
        }
        callBackend("steal", request)
        updateSelection(false);
        updatePlayerSelection("");
        setStealModal(false);
    }

    var players_to_steal: LimitedPlayer[] = []
    gamestate.players.forEach(player => {
        if (player.color != gamestate.current_player.color && player.resources != 0) {
            players_to_steal.push(player)
        }
    });

    const total_players = players_to_steal.length;
    let player_count_class = "one"

    switch (total_players) {
        case 2: 
            player_count_class = "two";
            break;
        case 3:
            player_count_class = "three";
            break;
    }

    return (
        <div className={"steal-modal " + (stealModalState ? "" : "disabled")}>
            <div className="header">KNIGHT CARD</div>
            <div className="description">Please select a player to steal from:</div>
            <div className={"players " + player_count_class}>
                {players_to_steal.map((player) => {
                    return <AvatarComponent key={player.id} image={player.image} color={player.color} selected={isSelected} setSelected={(updateSelection)} playerSelected={playerSelected} setPlayerSelected={updatePlayerSelection}/>
                })}
            </div>
            <div className="stealButtons">
                <button className={"denySteal"} onClick={() => cancel_steal()}>Cancel</button>
                <button className={"affirmSteal " + (isSelected ? "" : "dark")} disabled={!isSelected} onClick={() => handle_steal()}>Let's Steal!</button>
            </div>
        </div>
)};

export default StealModal