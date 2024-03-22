import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import VictoryPointsComponent from "../Components/victoryPointsComponent";
import React, { Component, useState } from "react";
import { StateProp } from "../Components/types";
import { players } from "../StaticData/PlayerData";
import { tiles } from "../StaticData/GameBoardStatic";
import "../Styles/GameSession.css";
import { GameState } from "@backend/types";

const GameSession = (props: StateProp) => {
  const [state, setState] = useState(props.gamestate);

  const updateState = (newState: GameState) => {
    setState(newState);
  }
  return (
    <div className="background-container">
            <div className="game-container">
                <div className="PlayerbarComponent"><PlayerBarComponent players={players}/></div>
                <div className="center-column">
                    <div className="game-board"><GameBoard tiles={tiles}/></div>
                    <div className="user-info">
                      <VictoryPointsComponent vp={props.gamestate.current_player.vp}/>
                      <Hand gamestate={props.gamestate} />
                    </div>
                </div>
                <div className="ActionsBarComponent"><ActionsBarComponent gamestate={props.gamestate}/></div>
            </div>
        </div>   
  );
};
export default GameSession;
