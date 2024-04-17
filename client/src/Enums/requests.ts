import { LimitedSession, road_meta_data, Player } from '@shared/types';

/**
 * Wrapper type for all kinds of requests.
 */
interface BackendRequest {
    state: LimitedSession;
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

interface RoadRequest extends BackendRequest {
    roadData: road_meta_data;
}
export {TradeRequest, BackendRequest, RoadRequest, StealRequest}
