import React from "react";
import "./rollButton.scss";

interface RollButtonProps {
  onClick: () => void;
  children: any;
}

const RollButton = ({ onClick, children }: RollButtonProps) => (
  <button type="button" className="roll-button" onClick={onClick}>
    {children}
  </button>
);

export default RollButton;
