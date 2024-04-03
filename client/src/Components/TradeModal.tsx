import React, { useState } from "react";
import "../Styles/TradeModal.css";
import EmptyHand from "./EmptyHand";
import { GameState } from "@shared/types";
import { TradeParams } from "../Enums/tradebody";
import { BackendRequest, TradeRequest } from "../Enums/requests";

/**
 * An interface that provides strong typing to a trade modal's enabled prop.
 */
export interface TradeModalProp {

    /**
     * Function to change the modal from being enabled or disabled.
     */
    setModal: (newState: boolean) => void;

    /**
     * Whether or not the modal is enabled.
     */
    modalState: boolean

    /**
     * The current gamestate.
     */
    gamestate: GameState

    /**
     * Function to set the gamestate.
     */
    setState: (newState: GameState) => void;

  }

const TradeModalComponent: React.FC<TradeModalProp> = ({ setModal, modalState, gamestate, setState }) => {

    const [trade, setTrade] = useState({offer: "", gain: ""});

    const updateTrade = (newParams: TradeParams) => {
        setTrade(newParams)
      }

    const callBackend = async (type: string, body: BackendRequest) => {
        const URL = 'http://localhost:5000/trade' + type;
        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }});
        
        // retrieve the new game state and update it in the frontend
        let newState = await response.json();
        setState(newState);
    }

    /**
     * Sets the new trade parameters, given the card type.
     */
    const handleButtonClick = () => {
        const body: TradeRequest = {
            resourceOffered: trade.offer,
            resourceGained: trade.gain,
            state: gamestate
        }
        callBackend("Bank", body)
    }

    const tradeParamsEmpty = () => {
        let empty = false;
        if (trade.gain == "" || trade.offer == "") {
            empty = true;
        }
        return empty;
    }

    return (
        <div className={"trade-modal " + (modalState ? "" : "disabled")}>
            <div className="header">TRADE</div>
            <div className="description">Please select a resource to trade from your hand:</div>
            <EmptyHand gamestate={gamestate} setTradeParams={updateTrade} tradeType={"offer"} tradeParameters={trade}/>
            <div className="description">Please select a resource to receive:</div>
            <EmptyHand gamestate={gamestate} setTradeParams={updateTrade} tradeType={"gain"} tradeParameters={trade}/>
            <div className="tradeButtons">
                <button className="cancelTrade" onClick={() => setModal(false)}>Cancel</button>
                <button className={"affirmTrade " + (tradeParamsEmpty() ? "dark" : "")} disabled={tradeParamsEmpty()} onClick={() => handleButtonClick()}>Let's Trade!</button>
            </div>
            
        </div>
    )
}

export default TradeModalComponent;