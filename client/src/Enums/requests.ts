import { GameState, road_meta_data } from '@shared/types';

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

interface RoadRequest extends BackendRequest {
    roadData: road_meta_data;
}
export {TradeRequest, BackendRequest, RoadRequest}