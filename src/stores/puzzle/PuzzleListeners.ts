import { ECellSelectedState, IPuzzleStore } from "./PuzzleStore";
import { Store } from "pullstate";

export function createPuzzleListeners(PuzzleStore: Store<IPuzzleStore>) {
  PuzzleStore.createReaction(s => s.selectedCell, ((watched, draft, original) => {
    if (watched.x !== -1 && watched.y !== -1) {
      const selectedValue = original.filledBlocks[watched.y][watched.x].value;

      for (let y = 0; y <= 8; y += 1) {
        for (let x = 0; x <= 8; x += 1) {
          if (watched.x === x && watched.y === y) {
            draft.filledBlocks[y][x].selectedState = ECellSelectedState.SELECTED;
          } else {
            draft.filledBlocks[y][x].selectedState = ECellSelectedState.UNSELECTED;
          }

          draft.filledBlocks[y][x].highlight = (original.filledBlocks[y][x].value === selectedValue);
        }
      }
    }
  }));
  /*PuzzleStore.createReaction(
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
  );*/
}
