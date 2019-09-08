import { Store, TUpdateFunction } from "pullstate";
import { IPuzzleStore } from "./PuzzleStore";
import sudoku from "sudoku-umd";

type TPullstateUpdateCreator<T> = (...args: any) => TUpdateFunction<T>;
type TPuzzleUpdaterCreator = TPullstateUpdateCreator<IPuzzleStore>;
type TPuzzleUpdater = TUpdateFunction<IPuzzleStore>;

const allowedValuesArr = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const uc_editCell: TPuzzleUpdaterCreator = (x: number, y: number, value: string) => (s) => {
  if (allowedValuesArr.indexOf(value) !== -1) {
    if (value === "") {
      value = ".";
    }
    s.filledBlocks[y][x] = value;
  }
}

export const u_reset: TPuzzleUpdater = (s) => {
  s.startedPuzzle = false;
  s.finishedPuzzle = false;
}

export const u_clearBoard: TPuzzleUpdater = (s, o) => {
  for (const [y, row] of o.originalFilledBlocks.entries()) {
    for (const [x, cell] of row.entries()) {
      s.filledBlocks[y][x] = cell;
    }
  }
}

export const uc_generateNewSudoku: TPuzzleUpdaterCreator = (level: "easy" | "medium" | "hard" | "very-hard") => (s) => {
  const sudokuString: string = sudoku.generate(level);
  const filledBlocks: string[][] = sudoku.board_string_to_grid(sudokuString);
  const originalFilled: string[][] = sudoku.board_string_to_grid(sudokuString);

  s.filledBlocks = filledBlocks;
  s.originalFilledBlocks = originalFilled;
  s.startedPuzzle = true;
}
