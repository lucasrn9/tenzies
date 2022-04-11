import React from "react";
import "./card.scss";

interface CardProps {
  freezed: boolean;
  number: number;
  id: number;
  toggleCard: (position: number) => void;
}

const Card = ({ freezed, number, id, toggleCard }: CardProps) => (
  <div
    className={freezed ? "card freeze" : "card"}
    onClick={() => toggleCard(id)}
    role="none"
  >
    <span className="number">{number}</span>
  </div>
);

export default Card;
