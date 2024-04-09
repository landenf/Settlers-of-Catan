import { GameState } from '@shared/types';

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

export {TradeRequest, BackendRequest}