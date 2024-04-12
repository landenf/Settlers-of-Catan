import { GameState } from "@shared/types";
import React from "react";

interface DevProps {
    state: GameState;
    setState: (newState: GameState) => void;
    updateIsCurrentPlayer: (newState: boolean) => void;
}

/**
 * A list of developer controls to test certain functionalities.
 */
const DevControls: React.FC<DevProps> = ({state, setState, updateIsCurrentPlayer}) => {

    const handleClick = async (player_index: number) => {
        // call back end
        const URL = 'http://localhost:5000/switchClient';
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify({player: player_index}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }});

        // retrieve the new game state and update it in the frontend
        let newState: GameState = await response.json();
        setState(newState)
        updateIsCurrentPlayer(newState.client.color === newState.current_player.color);
    }

    return (
        <div>
            <h1>Dev Controls</h1>
            <div>
                <button onClick={() => handleClick(0)}>Switch to Player 1 View</button>
                <button onClick={() => handleClick(1)}>Switch to Player 2 View</button>
                <button onClick={() => handleClick(2)}>Switch to Player 3 View</button>
            </div>
        </div>
    )};

export default DevControls;