import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import VictoryPointsComponent from "../Components/victoryPointsComponent";
import React, { Component, useEffect, useState } from "react";
import { tiles } from "../StaticData/GameBoardStatic";
import "../Styles/GameSession.css";
import { LimitedPlayer, LimitedSession, Player } from "@shared/types";
import RollButton from "../Components/RollButton";
import TradeModal from "../Components/TradeModal";
import StealModal from "../Components/StealModal";
import Dice from "../Components/Dice";
import { BackendRequest } from "../Enums/requests";
import EndGameModal from "../Components/EndGameModal";

/**
 * An interface that provides strong typing to a game session's game state prop.
 */
export interface StateProp {
  /**
   * The current game session's state.
   */
  gamestate: LimitedSession

  /**
   * The websocket used with this particular game session.
   */
  backend: WebSocket
}

const GameSession: React.FC<StateProp> = (props: StateProp) => {
  const [state, setState] = useState(props.gamestate);
  const [tradeModalEnabled, setTradeModal] = useState(false);
  const [stealModalEnabled, setStealModal] = useState(false);
  const [endGameModalEnabled, setEndGameModal] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [boughtDev, setBoughtDev] = useState(false);
  const [isCurrentPlayer, setCurrentPlayer] = useState(state.client.color === state.current_player.color);

  const updateState = (newState: LimitedSession) => {
    setState(newState);  
  }

  useEffect(() => {}, [state]);

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

  const backend = props.backend

  /**
   * Resets the action bar and roll button.
   */
  const resetTurn = () => {
    setRolled(false);
    setBoughtDev(false);
  }

  /**
   * Used to update the rendering of the client's screen when we
   * receive the gamestate from the backend.
   */
  backend.addEventListener("message", (msg) => {
    const newState: LimitedSession = JSON.parse(msg.data)
    updateState(newState)
    
    if (newState.client.hasKnight) {
      setStealModal(true);
    }
    
    if(newState.winner){
      setEndGameModal(true);
    }

    setCurrentPlayer(newState.client.color === newState.current_player.color);
  });


  /**
   * Uses the websocket to send information to the backend and 
   * retrieve the current game session.
   * @param type the "endpoint" to hit (/roll or /buyDevCard for example) 
   * @param body any payload information to send to the backend
   */
  const callBackend = (type: string, body: BackendRequest) => {
    const message = {
      endpoint: type,
      body: body
    }

    backend.send(JSON.stringify(message))

    if (type === "buyDevCard") {
      updateBoughtDev(true);
    }

    if (type === "passTurn") {
      resetTurn();
    }
  }

  /**
   * Chooses only players that are not the client to render
   * on the side component.
   */
  const players_to_render: LimitedPlayer[] = []
  state.players.forEach(player => {
    if (player.color != state.client.color) {
      players_to_render.push(player)
    }
  });

  return (
  <div>
    <TradeModal setTradeModal={updateTradeModal} tradeModalState={tradeModalEnabled} gamestate={state} callBackend={callBackend}/>
    <StealModal setStealModal={updateStealModal} stealModalState={stealModalEnabled} gamestate={state} callBackend={callBackend}/>
    <EndGameModal setEndGameModal={setEndGameModal} endGameModalState={endGameModalEnabled} gamestate={state} callBackend={callBackend}></EndGameModal>
      <div className="background-container">
        <div className={"game-container " + (tradeModalEnabled || stealModalEnabled ? "in-background" : "")}>
            <div className="PlayerbarComponent"><PlayerBarComponent players={players_to_render}/></div>
            <div className="center-column">
                <div className="game-board">
                  <Dice numberRolled={state.diceNumber}/>
                      <GameBoard 
                          tiles={tiles}
                          gamestate={ props.gamestate }
                          updateState={ updateState } /></div>
                <div className="user-info">
                  <VictoryPointsComponent vp={state.client.vp}/>
                  <Hand gamestate={state} />
                  <RollButton callBackend={callBackend} state={state} rolled={rolled} updateRolled={updateRolled} 
                  isCurrentPlayer={isCurrentPlayer}/>
                </div>
            </div>
            <div className={"ActionsBarComponent"}>
              <ActionsBarComponent state={state} callBackend={callBackend} setTradeModal={updateTradeModal}
              boughtDev={boughtDev} isCurrentPlayer={isCurrentPlayer}/>
            </div>
        </div>
      </div>   
    </div>
  );
};
export default GameSession;
