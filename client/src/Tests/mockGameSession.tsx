import React, { useState } from "react"
import RollButton from "../Components/RollButton"
import { MockLimitedGameState } from "../StaticData/GameStateStatic"
import { LimitedSession } from "@shared/types"
import { BackendRequest } from "../Enums/requests"
import ActionsBarComponent from "../Components/ActionsBarComponent"

var state = MockLimitedGameState

interface MockDataProps {
    state: LimitedSession
}

const callBackend = (action: string, request: BackendRequest) => {
    if (action === "roll") {
        state = request.state
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        state.diceNumber = {number1: dice1, number2: dice2}
    }
    
}

const MockGameSession = (props: MockDataProps) => {
    
    const [rolled, setRolled] = useState(false)
    const [isCurrentPlayer, setCurrentPlayer] = useState(false)
    const [tradeModalEnabled, setTradeModal] = useState(false)
    const [boughtDev, setBoughtDev] = useState(false)

    return (
        <div>
            <RollButton callBackend={callBackend} state={props.state} rolled={rolled} 
            updateRolled={setRolled} isCurrentPlayer={isCurrentPlayer}/>
            <ActionsBarComponent state={state} callBackend={callBackend} setTradeModal={setTradeModal}
            boughtDev={boughtDev} isCurrentPlayer={isCurrentPlayer}/>
        </div>
    )
}; export default MockGameSession