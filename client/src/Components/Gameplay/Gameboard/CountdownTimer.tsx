import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { LimitedSession } from "@shared/types";
import { BackendRequest } from "../../../Enums/requests";

interface CountdownCircleTimerProps {
    state: LimitedSession;
    callBackend: (type: string, body: BackendRequest) => void;
}

const CountdownTimer: React.FC<CountdownCircleTimerProps> = ({ state, callBackend }) => {
    const [remainingTime, setRemainingTime] = useState(100); // Initial duration

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime === 1) {
                    callBackend("passTurn", { state: state });
                    return 100; // Reset the timer
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, [state, callBackend]);

    return (
        <CountdownCircleTimer
            isPlaying={true}
            duration={100}
            colors={'#004777'}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    )
};

export default CountdownTimer;
