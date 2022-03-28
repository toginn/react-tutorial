import { click } from "@testing-library/user-event/dist/click";
import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square: FC<{ v: string; click: () => void }> = ({ v, click }) => {
  return (
    <button className="square" onClick={click}>
      {v}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState([""]);
  const handleClick = (i: number) => {
    const squaresAfter = squares.slice();
    squaresAfter[i] = "X";
    setSquares(squaresAfter);
  };
  const renderSquare = (i: number) => {
    return (
      <Square
        v={squares[i]}
        click={() => {
          handleClick(i);
        }}
      />
    );
  };

  const status = "Next player: X";

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
