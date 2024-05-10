import React from 'react';
import '../../../Styles/Gameplay/Menus/ActionsBar.css'; 
import { LimitedSession } from '@shared/types';
import { BackendRequest, StealRequest } from '../../../Enums/requests';

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
    * Function to call the backend through the main websocket.
    */
  callBackend: (type: string, body: BackendRequest) => void;

  /**
   * The current representation of the gamestate.
   */
  state: LimitedSession;

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
   * Updates whether or not potential settlements or roads should be displayed.
   */
  updatePotentialSettlements: (selected: string) => void;

  /**
   * True when the actions bar should be in the background and not clickable.
   */
  inBackground: boolean;

  /**
   * This is true if the button has already been rolled.
   */
  rollButtonState: boolean

}

/**
 * The sidebar used to trade resources, build settlements, and buy development 
 * cards. Appears on a player's game turn.
 */
const ActionsBarComponent: React.FC<ActionsBarComponentProps> = ({ state, callBackend, setTradeModal, 
  boughtDev, isCurrentPlayer, updatePotentialSettlements, rollButtonState, inBackground }) => {

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
    if (!inBackground) {
      callBackend(action, body)
    }
  };

  return (
    <div aria-label="actions-bar" className={("absolute-container " + ((isCurrentPlayer && state.roundNumber > 2 && rollButtonState == true && !inBackground) ? "" : "disabled"))}>
        <div className="inner-container">
        <h1 className="text-bold">BUILD</h1>
        <div className="line-thick"></div>
          <p className="button indented-text" aria-label="build-road" onClick={() => updatePotentialSettlements('roads')}>Road</p>
        <div className="line"></div>
          <p className="button indented-text" aria-label="build-settlement" onClick={() => updatePotentialSettlements('settlements')}>Settlement</p>
        <div className="line"></div>
        <h1 className="text-bold">TRADE</h1>
        <div className="line-thick"></div>
          <p className="button indented-text" aria-label="trade" onClick={() => setTradeModal(true)}>Bank</p>
        <div className="line"></div>
        <div className="line-thick"></div>
        <button className={"button text-bold " + (boughtDev ? "buy-dark" : "")} aria-label="buy-dev-card" 
          disabled={boughtDev || inBackground} onClick={() => handleButtonClick('buyDevCard', NullBody)}>DEVELOPMENT CARD</button>
        <div className="line-thick"></div>
        <h1 className="button text-bold" aria-label="passTurn" onClick={() => handleButtonClick('passTurn', NullBody)}>PASS TURN</h1>
        <div className="line-thick"></div>
        </div>
    </div>
  );
}

export default ActionsBarComponent;
