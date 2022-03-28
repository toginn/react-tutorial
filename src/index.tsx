import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square: FC<{ v: string; click: () => void }> = ({ v, click }) => {
  return (
    <button className="square" onClick={click}>
      {v}
    </button>
  );
};

const Board: FC<{ squares: string[]; click: (i: number) => void }> = ({
  squares,
  click,
}) => {
  const renderSquare = (i: number) => {
    return <Square v={squares[i]} click={() => click(i)} />;
  };

  return (
    <div>
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
  const [history, setHistory] = useState<{ squares: string[] }[]>([
    { squares: [] },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i: number) => {
    if (current.squares[i] || winner) return;
    const squaresAfter = current.squares.slice();
    squaresAfter[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setHistory([...history, { squares: squaresAfter }]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          click={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
