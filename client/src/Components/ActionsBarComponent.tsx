import React from 'react';
import '../Styles/ActionsBar.css'; 
import { players } from '../StaticData/PlayerData';
import { GameState } from '@shared/types';

/**
 * An interface that provides strong typing to a gamestate passed to the action bar.
 */
export interface ActionsBarComponentProps {
  updateState: (newState: GameState) => void;
}

/**
 * The sidebar used to trade resources, build settlements, and buy development 
 * cards. Appears on a player's game turn.
 */
const ActionsBarComponent: React.FC<ActionsBarComponentProps> = ({ updateState }) => {

  /**
   * Function used to call the backend API given a particular action, like
   * building settlements or roads.
   * @param action the type of action, such as buyDevCard
   */
  const handleButtonClick = async (action: string) => {
    // call back end
    const URL = 'http://localhost:5000/' + action;
    const response = await fetch('http://localhost:5000/' + action, {
      method: "POST",
      body: JSON.stringify(players[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }});

    // retrieve the new game state and update it in the frontend
    let newState = await response.json();
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
        <h1 className="button text-bold" onClick={() => handleButtonClick('buyDevCard')}>DEVELOPMENT CARD</h1>
        <div className="line-thick"></div>
        <h1 className="button text-bold" onClick={() => handleButtonClick('passTurn')}>PASS TURN</h1>
        <div className="line-thick"></div>
        </div>
    </div>
  );
}

export default ActionsBarComponent;
