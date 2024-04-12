import { GameState, Player } from '@shared/types';

/**
 * Wrapper type for all kinds of requests.
 */
interface BackendRequest {
    state: GameState;
}

/**
 * Format for sending a trade POST request.
 */
interface TradeRequest extends BackendRequest {
    resourceOffered: string;
    resourceGained: string;
}


/**
 * Format for sending a steal POST request.
 */
interface StealRequest extends BackendRequest {
    victim: number;
}

export {TradeRequest, BackendRequest, StealRequest}
