/**
 * Abstract interface providing strong typing to a list
 * of parameters for trade between two parties.
 */
export interface TradeParams {
    /**
     * The current player's offer of resources.
     */
    offer: string;

    /**
     * The current player's gain of resources.
     */
    gain: string
}