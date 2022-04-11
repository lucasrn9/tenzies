/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";

describe("card component", () => {
  it("should not have the class freeze when the prop freeze is false", () => {
    const toggleCard = jest.fn((id) => id);
    render(
      <Card key={1} freezed={false} id={1} number={1} toggleCard={toggleCard} />
    );
    const card = screen.getByText(1);
    expect(card.parentElement).not.toHaveClass("freeze");
  });
  it("should have the class freeze when the prop freeze is true", () => {
    const toggleCard = jest.fn((id) => id);
    render(<Card key={1} freezed id={1} number={1} toggleCard={toggleCard} />);
    const card = screen.getByText(1);
    expect(card.parentElement).toHaveClass("freeze");
  });
  it("should call the function toggleCard when the card is clicked, with the value of the prop 'id' as argument", () => {
    const toggleCard = jest.fn((id) => id);
    render(
      <Card key={1} freezed={false} id={1} number={1} toggleCard={toggleCard} />
    );
    const card = screen.getByText(1);
    userEvent.click(card);
    expect(toggleCard).toBeCalledTimes(1);
    expect(toggleCard).toHaveBeenCalledWith(1);
  });
});
