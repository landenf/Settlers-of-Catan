import React from 'react';
import '../Styles/ActionsBar.css'; 
import { players } from '../StaticData/PlayerData';
import { StateProp } from './types';
import { GameState } from '@backend/types';
import { MockGameState } from '../StaticData/GameStateStatic';
interface ActionsBarComponentProps {
  updateState: (newState: GameState) => void;
}
//Sidebar for user actions
const ActionsBarComponent: React.FC<ActionsBarComponentProps> = ({ updateState }) => {

  const handleButtonClick = async (action: string) => {
    //call back end
    const URL = 'http://localhost:5000/' + action;
    console.log(URL);
    const response = await fetch('http://localhost:5000/' + action, {
      method: "POST",
      body: JSON.stringify(players[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }});
    console.log(`Action performed: ${action}`);
    console.log(response.json);
    let newState = await response.json();
    console.log(newState.current_player);
    updateState(newState);
  };

  return (
    <div className="absolute-container">
        <div className="inner-container">
        <h1 className="text-bold">BUILD</h1>
        <div className="line-thick"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('buildRoad')}>Road</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('buildSettlement')}>Settlement</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('buildCity')}>City</p>
        <div className="line-thick"></div>
        <h1 className="text-bold">Trade</h1>
        <div className="line-thick"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('tradePlayerOne')}>Player One</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('tradePlayerTwo')}>Player Two</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('tradePlayerThree')}>Player Three</p>
        <div className="line-thick"></div>
        <h1 className="text-bold" onClick={() => handleButtonClick('buyDevCard')}>DEVELOPMENT CARD</h1>
        <div className="line-thick"></div>
        <h1 className="text-bold" onClick={() => handleButtonClick('passTurn')}>PASS TURN</h1>
        <div className="line-thick"></div>
        </div>
    </div>
  );
}

export default ActionsBarComponent;
