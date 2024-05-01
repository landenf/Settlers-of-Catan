import React, { useState } from "react"
import RollButton from "../../Components/RollButton"
import { MockLimitedGameState } from "../../StaticData/GameStateStatic"
import { LimitedSession } from "@shared/types"
import { BackendRequest } from "../../Enums/requests"
import ActionsBarComponent from "../../Components/ActionsBarComponent"
import { buyRoad, buySettlement, handleDiceRoll } from "./mockBackend"

var state = MockLimitedGameState

interface MockDataProps {
    state: LimitedSession
}

const MockGameSession = (props: MockDataProps) => {
    
    const [rolled, setRolled] = useState(false)
    const [tradeModalEnabled, setTradeModal] = useState(false)
    const [boughtDev, setBoughtDev] = useState(false)
    const [buyingRoad, setBuyingRoad] = useState(false)
    const [buyingSettlement, setBuyingSettlement] = useState(false)
    const [state, setState] = useState(props.state)
    const [isCurrentPlayer, setCurrentPlayer] = useState(state.client.color === state.current_player.color)
    const [selected, setSelected] = useState("")

    const callBackend = (action: string, request: BackendRequest) => {
        if (action === "roll") {
            setState(handleDiceRoll(request.state))
        }
        if (action === "buyDevCard") {
            setBoughtDev(true)
        }
        if (action === "buildRoad") {
            setState(buyRoad(request.state));
            setBuyingRoad(true);
        }
        if (action === "buildSettlement") {
            setState(buySettlement(request.state));
            setBuyingSettlement(true);
        }
    }
    
    return (
        <div>
            <div aria-label="test-gameboard " className={(buyingRoad ? "road-found " : " ") + 
                (buyingSettlement ? "settlement-found" : "")}></div>
            <div aria-label="test-trade-modal" className={(tradeModalEnabled ? "tradeModalOn" : "tradeModalOff")}></div>
            <RollButton callBackend={callBackend} state={props.state} rolled={rolled} 
            updateRolled={setRolled} isCurrentPlayer={isCurrentPlayer}/>
            <ActionsBarComponent state={state} callBackend={callBackend} setTradeModal={setTradeModal}
            boughtDev={boughtDev} isCurrentPlayer={isCurrentPlayer} updatePotentialSettlements={setSelected}/>
        </div>
    )
}; export default MockGameSession