import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RollButton from "./RollButton";

describe("RollButton component", () => {
  it("should call the onClick function everytime the button is clicked", () => {
    const onClick = jest.fn();
    render(<RollButton onClick={onClick}>Roll</RollButton>);
    const button = screen.getByText("Roll");
    userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
    userEvent.click(button);
    expect(onClick).toBeCalledTimes(2);
  });
  it("should calls the onClick function as a click event", () => {
    const onClick = jest.fn();
    render(<RollButton onClick={onClick}>Roll</RollButton>);
    const button = screen.getByText("Roll");
    userEvent.click(button);
    expect(onClick.mock.calls[0][0].type).toBe("click");
  });
});
