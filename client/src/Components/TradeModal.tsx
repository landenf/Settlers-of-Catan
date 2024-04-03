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

/**
 * A modal that pops out when trading. TODO: Work to include this with other forms of trading
 * besides the bank!
 */
const TradeModalComponent: React.FC<TradeModalProp> = ({ setModal, modalState, gamestate, setState }) => {

    const [trade, setTrade] = useState({offer: "", gain: ""});
    const [tradeEmpty, setTradeEmpty] = useState(0);

    const updateTrade = (newParams: TradeParams) => {
        setTrade(newParams);
      }

    const updateTradeEmpty = (newState: number) => {
        setTradeEmpty(newState);
    }

    /**
     * Method to call the backend for trading purposes.
     * @param type the type of trade to conduct
     * @param body the payload information, such as resources or gamestate
     */
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

    return (
        <div className={"trade-modal " + (modalState ? "" : "disabled")}>
            <div className="header">TRADE</div>
            <div className="description">Please select a resource to trade from your hand:</div>
            <EmptyHand gamestate={gamestate} setTradeParams={updateTrade} tradeType={"offer"} tradeParameters={trade} setTradeEmpty={updateTradeEmpty} tradeEmpty={tradeEmpty}/>
            <div className="description">Please select a resource to receive:</div>
            <EmptyHand gamestate={gamestate} setTradeParams={updateTrade} tradeType={"gain"} tradeParameters={trade} setTradeEmpty={updateTradeEmpty} tradeEmpty={tradeEmpty}/>
            <div className="tradeButtons">
                <button className="cancelTrade" onClick={() => setModal(false)}>Cancel</button>
                <button className={"affirmTrade " + (tradeEmpty != 2 ? "dark" : "")} disabled={tradeEmpty != 2} onClick={() => handleButtonClick()}>Let's Trade!</button>
            </div>
            
        </div>
    )
}

export default TradeModalComponent;