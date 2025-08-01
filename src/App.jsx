import { useState } from "react";
import Board from "./components/Board";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory, length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Got to the move #${move}`;
    } else {
      description = "Go to start the game.";
    }
    return (
      <li
        key={`li-${move}`}
        className="bg-gray-700 text-white px-2 py-1 mb-1 rounded-md"
      >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex gap-10 justify-center mt-5">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="border border-gray-700 rounded-md p-1">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
