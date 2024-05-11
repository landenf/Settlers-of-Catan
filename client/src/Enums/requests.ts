import { LimitedSession, road_meta_data, Player, community_meta_data } from '@shared/types';

/**
 * Wrapper type for all kinds of requests.
 */
interface BackendRequest {

    /**
     * The frontend gamestate.
     */
    state: LimitedSession;
}

/**
 * Format for sending a trade request.
 */
interface TradeRequest extends BackendRequest {

    /**
     * The resource offered to the bank.
     */
    resourceOffered: string;

    /**
     * The resource to receive from the bank.
     */
    resourceGained: string;
}


/**
 * Format for sending a steal request.
 */
interface StealRequest extends BackendRequest {
    victim: number;
}

/**
 * Format for sending a build road request.
 */
interface RoadRequest extends BackendRequest {

    /**
     * Information about the road needed to purchase it in the backend.
     */
    roadData: road_meta_data;
}

/**
 * Format for sending a build settlement (community) request.
 */
interface SettlementRequest extends BackendRequest {

    /**
     * Information about the settlement (community) to purchase it in the backend.
     */
    settlementData: community_meta_data;
}


/**
 * Format for sending a join game by ID request.
 */
interface JoinGameByIdRequest extends BackendRequest {

    /**
     * The ID of the game to join.
     */
    id: number;
}

export {TradeRequest, BackendRequest, RoadRequest, StealRequest, JoinGameByIdRequest, SettlementRequest}
