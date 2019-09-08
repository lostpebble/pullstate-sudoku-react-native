import { TUpdateFunction } from "pullstate";
import {
  ECellSelectedState,
  emptyScribbled,
  IPuzzleStore,
  TScribbled,
} from "./PuzzleStore";
import sudoku from "sudoku-umd";
import { createFilled2DArray } from "../../util/util";

type TPuzzleUpdater = TUpdateFunction<IPuzzleStore>;

export const allowedValuesArr = [
  "",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

export const uc_editCell = (value: string): TPuzzleUpdater => (s, o) => {
  if (allowedValuesArr.indexOf(value) !== -1) {
    if (value === "") {
      value = ".";
    }
    if (o.scribbleMode) {
      if (value === ".") {
        s.filledBlocks[o.selectedCell.y][o.selectedCell.x].scribbled = [
          ...emptyScribbled,
        ] as TScribbled;
      } else {
        const scribbleIndex = Number(value) - 1;
        s.filledBlocks[o.selectedCell.y][o.selectedCell.x].scribbled[
          scribbleIndex
        ] = !o.filledBlocks[o.selectedCell.y][o.selectedCell.x].scribbled[
          scribbleIndex
        ];
      }
    } else {
      s.filledBlocks[o.selectedCell.y][o.selectedCell.x].value = value;
      s.selectedCell.editOrd = o.selectedCell.editOrd + 1;
    }
  }
};

export const u_reset: TPuzzleUpdater = s => {
  s.startedPuzzle = false;
  s.finishedPuzzle = false;
};

export const u_clearBoard: TPuzzleUpdater = (s, o) => {
  for (const [y, row] of o.originalFilledBlocks.entries()) {
    for (const [x, cell] of row.entries()) {
      s.filledBlocks[y][x].value = cell;
    }
  }
};

export const uc_tapCell = (x: number, y: number): TPuzzleUpdater => (s, o) => {
  s.selectedCell = { x, y, isEditable: o.originalFilledBlocks[y][x] === ".", editOrd: o.selectedCell.editOrd };
};

export const uc_generateNewSudoku = (
  level: "easy" | "medium" | "hard" | "very-hard",
): TPuzzleUpdater => s => {
  const sudokuString: string = sudoku.generate(level);
  // const filledBlocks: string[][] = sudoku.board_string_to_grid(sudokuString);
  const originalFilled: string[][] = sudoku.board_string_to_grid(sudokuString);

  s.filledBlocks = createFilled2DArray(9, 9, (x, y) => ({
    value: originalFilled[y][x],
    highlight: false,
    scribbled: [...emptyScribbled] as TScribbled,
    selectedState: ECellSelectedState.UNSELECTED,
    wasOriginal: originalFilled[y][x] !== ".",
  }));
  s.originalFilledBlocks = originalFilled;
  s.startedPuzzle = true;
};
