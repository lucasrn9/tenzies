/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from "react";
import "./board.scss";
import Card from "../card/Card";
import RollButton from "../rollButton/RollButton";

const Board = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 10);
  const [cardsList, setCardsList] = useState(() => [
    { id: 0, number: getRandomNumber(), freezed: false },
    { id: 1, number: getRandomNumber(), freezed: false },
    { id: 2, number: getRandomNumber(), freezed: false },
    { id: 3, number: getRandomNumber(), freezed: false },
    { id: 4, number: getRandomNumber(), freezed: false },
    { id: 5, number: getRandomNumber(), freezed: false },
    { id: 6, number: getRandomNumber(), freezed: false },
    { id: 7, number: getRandomNumber(), freezed: false },
    { id: 8, number: getRandomNumber(), freezed: false },
    { id: 9, number: getRandomNumber(), freezed: false },
  ]);

  const [areAllCardsEqual, setAreAllCardsEqual] = useState(false);

  const checkIfAllCardsAreEqual = () => {
    const areAllEqual = cardsList.every(
      (card, i, arr) => card.number === arr[0].number && card.freezed === true
    );
    areAllEqual && setAreAllCardsEqual(true);
  };

  useEffect(() => {
    checkIfAllCardsAreEqual();
  }, [cardsList]);

  const toggleCard = (position: number) => {
    setCardsList((prevState) => {
      const newState = [...prevState];
      newState[position] = {
        ...newState[position],
        freezed: !newState[position].freezed,
      };
      return newState;
    });
  };

  const restartGame = () => {
    setCardsList((prevState) =>
      prevState.map((card) => ({
        ...card,
        freezed: false,
        number: getRandomNumber(),
      }))
    );
    setAreAllCardsEqual(false);
  };

  const rollNewNumbers = () => {
    setCardsList((prevState) =>
      prevState.map((card) =>
        card.freezed ? card : { ...card, number: getRandomNumber() }
      )
    );
  };

  const cards = cardsList.map((card) => (
    <Card
      key={card.id}
      freezed={card.freezed}
      number={card.number}
      id={card.id}
      toggleCard={toggleCard}
    />
  ));

  return (
    <div className="board">
      <div className="board-headings">
        <h2 className="board-title">Tenzies</h2>
        <p className="board-instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      {areAllCardsEqual ? (
        <h2 className="board-win-msg">You Win!</h2>
      ) : (
        <div className="cards">{cards}</div>
      )}
      {areAllCardsEqual ? (
        <RollButton onClick={restartGame}>Restart</RollButton>
      ) : (
        <RollButton onClick={rollNewNumbers}>Roll</RollButton>
      )}
    </div>
  );
};

export default Board;
