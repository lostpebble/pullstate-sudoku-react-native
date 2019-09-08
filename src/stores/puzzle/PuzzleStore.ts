import { Store } from "pullstate";
import { createPuzzleListeners } from "./PuzzleListeners";

export enum ECellSelectedState {
  UNSELECTED,
  SELECTED,
  SELECTED_IN_LINE
}

interface ICellState {
  selectedState: ECellSelectedState;
  wasOriginal: boolean;
  highlight: boolean;
  value: string;
  scribbled: string;
}

export interface IPuzzleStore {
  startedPuzzle: boolean;
  finishedPuzzle: boolean;
  filledBlocks: ICellState[][];
  originalFilledBlocks: string[][];
  selectedCell: {
    x: number;
    y: number;
  },
}

export const PuzzleStore = new Store<IPuzzleStore>({
  startedPuzzle: false,
  finishedPuzzle: false,
  filledBlocks: [],
  originalFilledBlocks: [],
  selectedCell: { x: -1, y: -1 },
});

createPuzzleListeners(PuzzleStore);
