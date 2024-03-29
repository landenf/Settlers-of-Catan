import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import VictoryPointsComponent from "../Components/victoryPointsComponent";
import React, { Component, useState } from "react";
import { tiles } from "../StaticData/GameBoardStatic";
import "../Styles/GameSession.css";
import { GameState } from "@backend/types";
import RollButton from "../Components/RollButton";

/**
 * An interface that provides strong typing to a game session's game state prop.
 */
export interface StateProp {
  /**
   * The current game session's state.
   */
  gamestate: GameState
}

const GameSession: React.FC<StateProp> = (props: StateProp) => {
  const [state, setState] = useState(props.gamestate);

  const updateState = (newState: GameState) => {
    setState(newState);
  }
  return (
    <div className="background-container">
            <div className="game-container">
                <div className="PlayerbarComponent"><PlayerBarComponent players={state.players}/></div>
                <div className="center-column">
                    <div className="game-board"><GameBoard tiles={tiles}/></div>
                    <div className="user-info">
                      <VictoryPointsComponent vp={state.current_player.vp}/>
                      <Hand gamestate={state} />
                      <RollButton updateState={updateState}/>
                    </div>
  
                </div>
                <div className="ActionsBarComponent"><ActionsBarComponent updateState={updateState}/></div>
            </div>
        </div>   
  );
};
export default GameSession;
