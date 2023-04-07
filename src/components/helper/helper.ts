import { Shape, Color, CellData } from "../Cell";

// helper function
const SHAPES: Shape[] = ["square", "triangle", "circle"];
const COLORS: Color[] = ["red", "blue", "green"];


const shuffleArray = <T>(array: T[]): T[] => {
  // Copy the array
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateBoard = (size: number): CellData[] => {
  // Create an array of all possible matches
  const allMatches: CellData[] = [];
  for (const shape of SHAPES) {
    for (const color of COLORS) {
      allMatches.push({ shape, color });
    }
  }

  // Use the shuffled array to populate the board
  const board: CellData[] = [];
  for (let i = 0; i < size * size; i += 2) {
    const match = allMatches.pop();
    if (!match) {
      throw new Error("Not enough matches for board");
    }
    board[i] = board[i + 1] = match;
  }

  // shuffle the board
  return shuffleArray(board);
};