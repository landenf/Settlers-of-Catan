import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import VictoryPointsComponent from "../Components/victoryPointsComponent";
import React, { Component, useState } from "react";
import { tiles } from "../StaticData/GameBoardStatic";
import "../Styles/GameSession.css";
import { GameState, Player } from "@shared/types";
import RollButton from "../Components/RollButton";
import TradeModal from "../Components/TradeModal";
import StealModal from "../Components/StealModal";
import Dice from "../Components/Dice";
import DevControls from "../Components/DevControls";

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
  const [rolled, setRolled] = useState(false);
  const [boughtDev, setBoughtDev] = useState(false);
  const [isCurrentPlayer, setCurrentPlayer] = useState(state.client.color === state.current_player.color);

  const updateState = (newState: GameState) => {
    setState(newState);
  }

  const updateTradeModal = (newState: boolean) => {
    setTradeModal(newState)
  }

  const updateStealModal = (newState: boolean) => {
    setStealModal(newState);
  }

  const updateRolled = (newState: boolean) => {
    setRolled(newState);
  }

  const updateBoughtDev = (newState: boolean) => {
    setBoughtDev(newState);
  }

  const updateCurrentPlayer = (newState: boolean) => {
    setCurrentPlayer(newState)
  }

  /**
   * Resets the action bar and roll button.
   */
  const resetTurn = () => {
    setRolled(false);
    setBoughtDev(false);
  }

  /**
   * Chooses only players that are not the client to render
   * on the side component.
   */
  const players_to_render: Player[] = []
  state.players.forEach(player => {
    if (player.color != state.client.color) {
      players_to_render.push(player)
    }
  });

  return (
  <div>
    <TradeModal setTradeModal={updateTradeModal} tradeModalState={tradeModalEnabled} gamestate={state} setState={updateState}/>
    <StealModal setStealModal={updateStealModal} stealModalState={stealModalEnabled} gamestate={state} setState={updateState}/>
      <div className="background-container">
        <div className={"game-container " + (tradeModalEnabled || stealModalEnabled ? "in-background" : "")}>
            <div className="PlayerbarComponent"><PlayerBarComponent players={players_to_render}/></div>
            <div className="center-column">
                <div className="game-board"><Dice numberRolled={state.diceNumber}/><GameBoard tiles={tiles}/></div>
                <div className="user-info">
                  <VictoryPointsComponent vp={state.client.vp}/>
                  <Hand gamestate={state} />
                  <RollButton updateState={updateState} rolled={rolled} updateRolled={updateRolled} 
                  isCurrentPlayer={isCurrentPlayer}/>
                </div>
            </div>
            <div className={"ActionsBarComponent"}><ActionsBarComponent state={state} 
            updateState={updateState} setTradeModal={updateTradeModal} setStealModal={updateStealModal}
            updateBoughtDev={updateBoughtDev} boughtDev={boughtDev} updateIsCurrentPlayer={updateCurrentPlayer}
            isCurrentPlayer={isCurrentPlayer} reset={resetTurn}/></div>
        </div>
      </div>   
      <DevControls state={state} setState={updateState} updateIsCurrentPlayer={updateCurrentPlayer}/>
    </div>
  );
};
export default GameSession;
