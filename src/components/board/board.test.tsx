/* eslint-disable array-callback-return */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";

describe("board component", () => {
  it("should not show the win message and the restart button if the numbers aren't all the same or if the cards aren't all freezed", () => {
    render(<Board />);
    const winMsg = screen.queryByText("You Win!");
    const restartButton = screen.queryByText("Restart");
    expect(winMsg).not.toBeInTheDocument();
    expect(restartButton).not.toBeInTheDocument();
  });

  it("should runs the function math.random to generate new random numbers to all unfreezed cards", () => {
    render(<Board />);
    const rollButton = screen.getByText("Roll");
    jest.spyOn(Math, "random").mockReturnValue(0.8);
    userEvent.click(rollButton);
    const cards = screen.getAllByText(8);
    expect(cards.length).toBe(10);
  });

  it("should not generate new numbers to freezed cards (should not run the function math.random in freezed cards)", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    render(<Board />);
    const cards = screen.getAllByText(1);
    const rollButton = screen.getByText("Roll");
    userEvent.click(cards[0]);
    userEvent.click(cards[1]);
    jest.spyOn(Math, "random").mockReturnValue(0.8);
    userEvent.click(rollButton);
    expect(cards[0]).toHaveTextContent(/1/);
    expect(cards[1]).toHaveTextContent(/1/);
    const cardsThatChanged = screen.getAllByText(8);
    expect(cardsThatChanged.length).not.toBe(0);
    expect(cardsThatChanged.length).not.toBe(undefined);
  });

  it("should not show Cards neither RollButton when all cards are freezed and have the same number", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    render(<Board />);
    const cards = screen.getAllByText(1);
    cards.map((card) => {
      userEvent.click(card);
    });
    cards.map((card) => {
      expect(card).not.toBeVisible();
    });
  });

  it("should show a win message and a restart button when all cards are freezed and have the same number", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    render(<Board />);
    const cards = screen.getAllByText(1);
    cards.map((card) => {
      userEvent.click(card);
    });
    const winMsg = screen.getByText("You Win!");
    const restartButton = screen.getByText("Restart");
    expect(winMsg).toBeVisible();
    expect(restartButton).toBeVisible();
  });

  it("should reset the board when the restart button is clicked", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    render(<Board />);
    const cards = screen.getAllByText(1);
    cards.map((card) => {
      userEvent.click(card);
    });
    const restartButton = screen.getByRole("button", { name: "Restart" });
    userEvent.click(restartButton);
    const rollButton = screen.queryByRole("button", { name: "Roll" });
    expect(rollButton).toBeInTheDocument();
    const cardsAfterRestart = screen.getAllByText(1);
    cardsAfterRestart.map((card) => {
      expect(card).toBeVisible();
    });
  });
});
