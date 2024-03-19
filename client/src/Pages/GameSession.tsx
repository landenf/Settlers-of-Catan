import GameBoard from "../Components/GameBoard";
import PlayerBarComponent from "../Components/PlayerBarComponent";
import ActionsBarComponent from "../Components/ActionsBarComponent";
import Hand from "../Components/Hand"
import React from "react";
import { StateProp } from "../Components/types";

const GameSession = (props: StateProp) => {
  return (
    <div>
      <GameBoard tiles={props.gamestate.gameboard.tiles}/>
      <PlayerBarComponent players={props.gamestate.players}></PlayerBarComponent>
      <ActionsBarComponent></ActionsBarComponent>
      <Hand></Hand>
    </div>
  );
};
export default GameSession;
