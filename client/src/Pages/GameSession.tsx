import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import VictoryPointsComponent from "../Components/victoryPointsComponent";
import React, { Component, useEffect, useState } from "react";
import { tiles } from "../StaticData/GameBoardStatic";
import "../Styles/GameSession.css";
import { GameState } from "@shared/types";
import RollButton from "../Components/RollButton";
import TradeModal from "../Components/TradeModal";
import { TradeParams } from "../Enums/tradebody";

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
  const [modalEnabled, setModal] = useState(false);

  const updateState = (newState: GameState) => {
    setState(newState);  
  }

  useEffect(() => {
    console.log("Updated state:,", state);
  }, [state]);

  const updateModal = (newState: boolean) => {
    setModal(newState)
  }

  return (
  <div>
    <TradeModal setModal={updateModal} modalState={modalEnabled} gamestate={state} setState={updateState}/>
      <div className="background-container">
        <div className={"game-container " + (modalEnabled ? "in-background" : "")}>
            <div className="PlayerbarComponent"><PlayerBarComponent players={state.players}/></div>
            <div className="center-column">
                <div className="game-board"><GameBoard 
                                            tiles={tiles}
                                            gamestate={ props.gamestate }
                                            updateState={ updateState } /></div>
                <div className="user-info">
                  <VictoryPointsComponent vp={state.current_player.vp}/>
                  <Hand gamestate={state} />
                  <RollButton updateState={updateState}/>
                </div>
            </div>
            <div className="ActionsBarComponent"><ActionsBarComponent state={state} updateState={updateState} setModal={updateModal}/></div>
        </div>
      </div>   
    </div>
  );
};
export default GameSession;
