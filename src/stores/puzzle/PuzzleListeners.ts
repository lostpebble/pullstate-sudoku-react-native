import { PuzzleStore } from "./PuzzleStore";
import sudoku from "sudoku-umd";

export function createListeners() {
  PuzzleStore.createReaction(
    s => s.filledBlocks,
    (watched, s, o) => {
      if (o.startedPuzzle && watched.length > 0) {
        const boardString = sudoku.board_grid_to_string(watched);
        const solvedBoardString = sudoku.solve(boardString);

        if (solvedBoardString) {
          console.log(`Avert your eyes! - The solved Sudoku:`);
          sudoku.print_board(solvedBoardString);
        }

        s.finishedPuzzle = boardString === solvedBoardString;
      }
    },
  );
}
