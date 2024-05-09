import React, { useState } from "react";
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'
import { LimitedSession } from "@shared/types";
import { BackendRequest } from "../../../Enums/requests";

interface CountdownCircleTimerProps {

    state: LimitedSession;

    callBackend: (type: string, body: BackendRequest) => void;
}

const CountdownTimer: React.FC<CountdownCircleTimerProps> = ({ state, callBackend }) => {

    // the amount of time alotted for the turn
    const duration = 100;

    const handleComplete = () => {
       callBackend("passTurn", { state: state });
    }

    return (
        
        <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={'#004777'}
            onComplete={() => {  
                handleComplete();                    
                return { shouldRepeat: true };
            }}
            >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        
        
    )
};
export default CountdownTimer;