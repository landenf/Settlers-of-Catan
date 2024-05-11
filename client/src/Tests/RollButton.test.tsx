import { act, render, screen, waitFor } from "@testing-library/react";
import { MockGameState, MockLimitedGameState } from "../StaticData/GameStateStatic";
import React from "react";
import userEvent from "@testing-library/user-event";
import MockGameSession from "./__mocking__/mockGameSession";
import "@testing-library/jest-dom";

/**
 * A mock game state that's reset after every test.
 */
var mockGame = MockLimitedGameState

beforeEach(() => {mockGame = MockLimitedGameState})

describe("In the roll button", () => {
  it("The Roll button should be enabled on turn", async () => {
    render(<MockGameSession state={mockGame}/> );
    
    expect(screen.getByLabelText("rollButton")).toBeEnabled();
  });
  
  it("The Roll button should be disabled once clicked", async () => {

    render(<MockGameSession state={mockGame}/>);

    await act(async () => {
      await userEvent.click(screen.getByLabelText("rollButton"));
    });
    
    expect(screen.getByLabelText("rollButton")).toBeDisabled();

  });
  
  it("The Roll button should be disabled on other players' turns", async () => {
    mockGame.client = MockGameState.players[1];
    render(<MockGameSession state={mockGame}/>);
  
    expect(screen.getByLabelText("rollButton")).toHaveClass("disabled");
  });
  
  it("The Roll button once clicked should change the number the dice rolled", async () => {
    render(<MockGameSession state={mockGame} />);
  
    await act(async () => {
      await userEvent.click(screen.getByLabelText("rollButton"));
    });
  
    expect(mockGame.diceNumber.number1 != 1);
    expect(mockGame.diceNumber.number2 != 1);
  });
  
})
