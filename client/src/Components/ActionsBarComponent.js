import React from 'react';
import '../Styles/ActionsBar.css'; 

//Sidebar for user actions
const ActionsBarComponent = () => {

  const handleButtonClick = (action) => {
    //call back end
    console.log(`Action performed: ${action}`);
  };

  return (
    <div className="absolute-container">
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
      <h1 className="text-bold" onClick={() => handleButtonClick('settlementCard')}>SETTLEMENT CARD</h1>
      <div className="line-thick"></div>
      <h1 className="text-bold" onClick={() => handleButtonClick('passTurn')}>PASS TURN</h1>
      <div className="line-thick"></div>
    </div>
  );
}

export default ActionsBarComponent;
