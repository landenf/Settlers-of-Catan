import { act, render, screen, waitFor } from "@testing-library/react";
import { MockGameState, MockLimitedGameState } from "@shared/StaticData/GameStateStatic";
import React from "react";
import userEvent from "@testing-library/user-event";
import MockGameSession from "./__mocking__/mockGameSession";
import "@testing-library/jest-dom";

/**
 * A mock game state that's reset after every test.
 */
var mockGame = MockLimitedGameState

beforeEach(() => {mockGame = MockLimitedGameState})

describe("In the Actions Bar", () => {
    it("The trading modal should open when 'trade' is clicked", async () => {
        render(<MockGameSession state={mockGame}/> );

        await act(async () => {
            await userEvent.click(screen.getByLabelText("trade"));
          });

          expect(screen.getByLabelText("test-trade-modal")).toHaveClass("tradeModalOn");
    })

    it("The dev card button should be disabled once clicked", async () => {
        render(<MockGameSession state={mockGame}/> );

        await act(async () => {
            await userEvent.click(screen.getByLabelText("buy-dev-card"));
          });

          expect(screen.getByLabelText("buy-dev-card")).toBeDisabled();
    })

    it("The dev card should be enabled by default", async () => {
        render(<MockGameSession state={mockGame}/> );

        expect(screen.getByLabelText("buy-dev-card")).toBeEnabled();
    })

    it("The actions bar should be enabled for the client", async () => {
        render(<MockGameSession state={mockGame}/> );

        expect(screen.getByLabelText("actions-bar")).not.toHaveClass("disabled");
    })

    it("The actions bar should be disabled for other non-current players", async () => {
        mockGame.client = MockGameState.players[1]
        render(<MockGameSession state={mockGame}/> );

        expect(screen.getByLabelText("actions-bar")).toHaveClass("disabled");
    })

    it("The road purchase button should call the backend", async () => {
        render(<MockGameSession state={mockGame}/> );

        await act(async () => {
            await userEvent.click(screen.getByLabelText("build-road"));
          });
        
          expect(screen.getByLabelText("test-gameboard")).toHaveClass("road-found");

    })

    it("The settlement purchase button should call the backend", async () => {
        render(<MockGameSession state={mockGame}/> );

        await act(async () => {
            await userEvent.click(screen.getByLabelText("build-settlement"));
          });
        
          expect(screen.getByLabelText("test-gameboard")).toHaveClass("settlement-found");

    })

    it("The pass turn button should make the whole component disappear", async () => {
        render(<MockGameSession state={mockGame}/> );

        await act(async () => {
            await userEvent.click(screen.getByLabelText("passTurn"));
          });

          expect(screen.getByLabelText("actions-bar")).toHaveClass("disabled");
    })

})