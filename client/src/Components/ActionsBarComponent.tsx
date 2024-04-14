import React from 'react';
import '../Styles/ActionsBar.css'; 
import { LimitedSession } from '@shared/types';
import { BackendRequest, StealRequest } from '../Enums/requests';

/**
 * An interface that provides strong typing to props passed to the action bar.
 */
interface ActionsBarComponentProps {

  /**
   * Function to set the trading modal on or off.
   * @param newState "true" to display trading modal, "false" to not
   */
  setTradeModal: (newState: boolean) => void;

  /**
   * Function to set the steal modal on or off.
   * @param newState "true" to display steal modal, "false" to not
   */
  setStealModal: (newState: boolean) => void;

  /**
     * Function to call the backend through the main websocket.
     */
  callBackend: (type: string, body: BackendRequest) => void;

  /**
   * The current representation of the gamestate.
   */
  state: LimitedSession;

  /**
   * Updates whether or not a player has bought a dev card this turn.
   */
  updateBoughtDev: (newState: boolean) => void;

  /**
   * This is true if a player has purchased a dev card this turn, and false if not.
   */
  boughtDev: boolean;

  /**
   * Determines whether or not this component is being rendered on the current
   * player's screen.
   */
  isCurrentPlayer: boolean;

  /**
   * Resets action bar component to its initial state.
   */
  reset: () => void;

}

/**
 * The sidebar used to trade resources, build settlements, and buy development 
 * cards. Appears on a player's game turn.
 */
const ActionsBarComponent: React.FC<ActionsBarComponentProps> = ({ state, callBackend, setTradeModal, 
  setStealModal, updateBoughtDev, boughtDev, isCurrentPlayer, reset }) => {

  /**
 * A null body with the gamestate. This'll probably be removed before
 * heading onto production.
 */
const NullBody: BackendRequest = {
  state: state
}

const KnightBody: StealRequest = {
  state: state,
  victim: 1
}
  
  const handleButtonClick = async (action: string, body: BackendRequest) => {

    callBackend(action, body)
  };

  return (
    <div className={("absolute-container " + (isCurrentPlayer ? "" : "disabled"))}>
        <div className="inner-container">
        <h1 className="text-bold">BUILD</h1>
        <div className="line-thick"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('buildRoad', NullBody)}>Road</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('buildSettlement', NullBody)}>Settlement</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('buildCity', NullBody)}>City</p>
        <div className="line-thick"></div>
        <h1 className="text-bold">TRADE</h1>
        <div className="line-thick"></div>
          <p className="button indented-text" onClick={() => setTradeModal(true)}>Bank</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('steal', KnightBody)}>Player One</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('tradeBank', NullBody)}>Player Two</p>
        <div className="line"></div>
          <p className="button indented-text" onClick={() => handleButtonClick('tradeBank', NullBody)}>Player Three</p>
        <div className="line-thick"></div>
        <button className={"button text-bold " + (boughtDev ? "buy-dark" : "")} disabled={boughtDev} onClick={() => handleButtonClick('buyDevCard', NullBody)}>DEVELOPMENT CARD</button>
        <div className="line-thick"></div>
        <h1 className="button text-bold" onClick={() => handleButtonClick('passTurn', NullBody)}>PASS TURN</h1>
        <div className="line-thick"></div>
        </div>
    </div>
  );
}

export default ActionsBarComponent;
