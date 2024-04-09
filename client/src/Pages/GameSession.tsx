import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import VictoryPointsComponent from "../Components/victoryPointsComponent";
import React, { Component, useState } from "react";
import { tiles } from "../StaticData/GameBoardStatic";
import "../Styles/GameSession.css";
import { GameState } from "@shared/types";
import RollButton from "../Components/RollButton";
import TradeModal from "../Components/TradeModal";
import StealModal from "../Components/StealModal";

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
  const [tradeModalEnabled, setTradeModal] = useState(false);
  const [stealModalEnabled, setStealModal] = useState(false);
  

  const updateState = (newState: GameState) => {
    setState(newState);
  }

  const updateTradeModal = (newState: boolean) => {
    setTradeModal(newState)
  }

  const updateStealModal = (newState: boolean) => {
    setStealModal(newState);
  }

  return (
  <div>
    <TradeModal setTradeModal={updateTradeModal} tradeModalState={tradeModalEnabled} gamestate={state} setState={updateState}/>
    <StealModal setStealModal={updateStealModal} stealModalState={stealModalEnabled} gamestate={state} setState={updateState}/>
      <div className="background-container">
        <div className={"game-container " + (tradeModalEnabled || stealModalEnabled ? "in-background" : "")}>
            <div className="PlayerbarComponent"><PlayerBarComponent players={state.players}/></div>
            <div className="center-column">
                <div className="game-board"><GameBoard tiles={tiles}/></div>
                <div className="user-info">
                  <VictoryPointsComponent vp={state.current_player.vp}/>
                  <Hand gamestate={state} />
                  <RollButton updateState={updateState}/>
                </div>
            </div>
            <div className="ActionsBarComponent"><ActionsBarComponent state={state} updateState={updateState} setTradeModal={updateTradeModal} setStealModal={updateStealModal}/></div>
        </div>
      </div>   
    </div>
  );
};
export default GameSession;
