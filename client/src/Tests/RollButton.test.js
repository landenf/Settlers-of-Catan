import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GameSession from "../Pages/GameSession";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("The Roll button should be enabled on turn", async () => {
  render(<GameSession />);

  // designate player turn

  expect(screen.getByLabelText("rollButton")).toBeEnabled();
});

it("The Roll button should be disabled once clicked", async () => {
  render(<GameSession />);

  // designate player turn

  await userEvent.click(screen.getByLabelText("rollButton"));

  expect(screen.getByLabelText("Submit Comment")).toBeDisabled();
});

it("The Roll button should be disabled on other players' turns", async () => {
  render(<GameSession />);

  // designate player turn

  expect(screen.getByLabelText("Submit Comment")).toBeDisabled();
});

it("The Roll button should change colors when hovered over", async () => {
  render(<GameSession />);

  // designate player turn

  await userEvent.hover(screen.getByLabelText("rollButton"));

  // is this the correct way to access background color
  expect(screen.getByLabelText("Submit Comment")).toHaveStyle(
    "background-color: 100%"
  );
});

it("The Roll button once clicked should change the number of resource cards when their turn", async () => {
  render(<GameSession />);
  // designate player turn

  // setting up player resource numbers

  // setting up player settlements
  await userEvent.click(screen.getByLabelText("rollButton"));

  // expected player resource numbers

  expect();
});

it("The Roll button once clicked should change the number of resource cards when not their turn", async () => {
  render(<GameSession />);
  // designate player turn

  // setting up player resource numbers

  // setting up player settlements
  await userEvent.click(screen.getByLabelText("rollButton"));

  // expected player resource numbers

  expect();
});

it("The Roll button once clicked should not change the number of resource cards when their turn", async () => {
  render(<GameSession />);
  // designate player turn

  // setting up player resource numbers

  // setting up player settlements
  await userEvent.click(screen.getByLabelText("rollButton"));

  // expected player resource numbers

  expect();
});

it("The Roll button once clicked should not change the number of resource cards when not their turn", async () => {
  render(<GameSession />);
  // designate player turn

  // setting up player resource numbers

  // setting up player settlements
  await userEvent.click(screen.getByLabelText("rollButton"));

  // expected player resource numbers

  expect();
});

it("The Roll button once clicked should change the dice images", async () => {
  render(<GameSession />);
  // set initial dice image

  await userEvent.click(screen.getByLabelText("rollButton"));

  // check the dice image change
  expect();
});

// backend tests

// test handleDiceRoll

// test rollDice
