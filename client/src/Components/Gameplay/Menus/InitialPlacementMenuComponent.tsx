import React, { useState } from 'react';
import '../../../Styles/Gameplay/Menus/ActionsBar.css'; 
import { LimitedSession } from '@shared/types';
import { BackendRequest } from '../../../Enums/requests';

/**
 * An interface that provides strong typing to props passed to the action bar.
 */
interface InitialPlacementMenuComponentProps {

    /**
      * Function to call the backend through the main websocket.
      */
    callBackend: (type: string, body: BackendRequest) => void;
  
    /**
     * The current representation of the gamestate.
     */
    state: LimitedSession;
  
  
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
     * This is true if a player has selected a road to place.
     */
    selectedRoad: boolean;

    /**
     * This is true if a player has selected a settlement to place.
     */
    selectedSettlement: boolean;
  
  }

  /**
   * A reduced version of the actions bar component which allows the user to build roads and settlements
   * during the initial two rounds of the game.
   */
  const InitialPlacementMenuComponent: React.FC<InitialPlacementMenuComponentProps> = ({ state, 
    callBackend, isCurrentPlayer, updatePotentialSettlements, selectedRoad, selectedSettlement }) => {
  /**
    * A null body with the gamestate. This'll probably be removed before
    * heading onto production.
    */
    const NullBody: BackendRequest = {
    state: state
    }
    
    const [roadButton, setRoadButton] = useState("Road");
    const buttonClickRoads = () => {
      setRoadButton("Choose a Road");
    }
    
    const handleButtonClick = async (action: string, body: BackendRequest) => {

        callBackend(action, body)
        setRoadButton("Road");
      };
    
    return (
      <div aria-label="initial-bar" className={("absolute-container " + ((isCurrentPlayer && (state.roundNumber  <= 2))  ? "" : "disabled"))}>
        <div className="inner-container">
          <h1 className={"button text-bold " + (selectedRoad ? "buy-dark" : "")} aria-label="build-initial-road" onClick={buttonClickRoads}>{roadButton}</h1>
          <div className="line"></div>
          <h1 className={"button text-bold " + ((!selectedRoad || selectedSettlement) ? "buy-dark" : "")} aria-label="build-initial-settlement" onClick={() => updatePotentialSettlements('settlements')}>Settlement</h1>
          <div className="line-thick"></div>
          <h1 className={"button text-bold " + ((!selectedRoad || !selectedSettlement) ? "buy-dark" : "")} aria-label="passTurn" onClick={() => handleButtonClick('passTurn', NullBody)}>PASS TURN</h1>
          <div className="line-thick"></div>
        </div>
    </div>

    );
  }

  export default InitialPlacementMenuComponent;