import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GameSession from "../Pages/GameSession";
import { MockGameState } from "../StaticData/GameStateStatic";

it("The Roll button should be enabled on turn", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);

  // designate player turn

  expect(screen.getByLabelText("rollButton")).toBeEnabled();
});

it("The Roll button should be disabled once clicked", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);
  // designate player turn

  await userEvent.click(screen.getByLabelText("rollButton"));

  expect(screen.getByLabelText("Submit Comment")).toBeDisabled();
});

it("The Roll button should be disabled on other players' turns", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);
  mockGame.client = mockGame.players[1];

  expect(screen.getByLabelText("Submit Comment")).toBeDisabled();
});

it("The Roll button should change colors when hovered over", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);

  await userEvent.hover(screen.getByLabelText("rollButton"));

  expect(screen.getByLabelText("Submit Comment")).toHaveStyle(
    "background-color: 100%"
  );
});

it("The Roll button once clicked should change the number the dice rolled", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);

  await userEvent.click(screen.getByLabelText("rollButton"));

  expect(mockGame.diceNumber.number1 != 1);
  expect(mockGame.diceNumber.number2 != 1);
});

it("The Roll button should be enabled for player 2 after player 1 passes their turn", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);
  await userEvent.click(screen.getByLabelText("rollButton"));
  await userEvent.click(screen.getByText("PASS TURN"));

  mockGame.client = mockGame.players[1];

  expect(screen.getByLabelText("Submit Comment")).toBeEnabled();
});

it("The Roll button should be disabled for player 2 after player 1 rolls but does not yet pass their turn", async () => {
  mockGame = new MockGameState();
  render(<GameSession gamestate={mockGame} />);
  await userEvent.click(screen.getByLabelText("rollButton"));

  mockGame.client = mockGame.players[1];

  expect(screen.getByLabelText("Submit Comment")).toBeDisabled();
});
