import React, { useState, useEffect } from "react";
import Cell, { CellData } from "./Cell";
import "./Board.css";
import { generateBoard } from "./helper/helper";

const SIZE = 4; // Number of cells per row and column

const Board: React.FC = () => {
  const [board, setBoard] = useState<CellData[][]>([]); // CellProps is an interface defined in Cell.tsx
  const [revealedCells, setRevealedCells] = useState<number[][]>([]); // Array of indexes of revealed cells
  const [matchedCells, setMatchedCells] = useState<number[][]>([]); // Array of indexes of matched cells
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const regenerateBoard = () => {
    const generatedBoard = generateBoard(SIZE);
    // convert generated board to size x size array
    const boardArray = [];
    for (let i = 0; i < SIZE; i++) {
      boardArray.push(generatedBoard.slice(i * SIZE, (i + 1) * SIZE));
    }
    setBoard(boardArray);
  };
  // states...
  useEffect(() => {
    regenerateBoard();
  }, []);

  useEffect(() => {
    // if all cells are matched, game is complete
    if (matchedCells.length === SIZE * SIZE) setGameComplete(true);
  }, [matchedCells]);

  useEffect(() => {
    // reset game if game is complete
    if (gameComplete) {
      regenerateBoard();
      setRevealedCells([]);
      setMatchedCells([]);
      setGameComplete(false);
      setTimer(0);
    }
  }, [gameComplete]);

  useEffect(() => {
    if (revealedCells.length === 2) {
      // if two cells are revealed
      const [indexCol1, indexRow1] = revealedCells[0];
      const [indexCol2, indexRow2] = revealedCells[1];
      const cell1 = board[indexRow1][indexCol1];
      const cell2 = board[indexRow2][indexCol2];
      if (cell1.shape === cell2.shape && cell1.color === cell2.color) {
        // if the two revealed cells match
        setMatchedCells([...matchedCells, revealedCells[0], revealedCells[1]]);
        // add the two revealed cells to matchedCells
        setRevealedCells([]);
        // clear revealedCells
      } else {
        setTimeout(() => {
          setRevealedCells([]);
          // clear revealedCells after 1 second
        }, 1000);
      }
    }
  }, [board, matchedCells, revealedCells]);

  const handleCellClick = (indexCol: number, indexRow: number) => {
    if (gameComplete) return;
    // if game is complete, do nothing
    if (revealedCells.length === 2) return;
    // if two cells are already revealed, do nothing
    if (
      revealedCells.some((cell) => cell[0] === indexCol && cell[1] === indexRow)
    )
      return;
    // if the clicked cell is already revealed, do nothing
    if (
      matchedCells.some((cell) => cell[0] === indexCol && cell[1] === indexRow)
    )
      return;
    // if the clicked cell is already matched, do nothing
    setRevealedCells([...revealedCells, [indexCol, indexRow]]);
    // add the clicked cell to revealedCells
  };

  return (
    <>
      <div className="timer">{timer}</div>
      <div className="board">
        {board.map((row, indexRow) => (
          <div className="row" key={indexRow}>
            {row.map((cell, indexCol) => (
              <Cell
                key={indexCol}
                shape={cell.shape}
                color={cell.color}
                revealed={revealedCells.some(
                  (cell) => cell[0] === indexCol && cell[1] === indexRow,
                )}
                matched={matchedCells.some(
                  (cell) => cell[0] === indexCol && cell[1] === indexRow,
                )}
                onClick={() => handleCellClick(indexCol, indexRow)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
