import { Store } from "pullstate";
import { createListeners } from "./PuzzleListeners";

export interface IPuzzleStore {
  startedPuzzle: boolean;
  finishedPuzzle: boolean;
  filledBlocks: string[][];
  originalFilledBlocks: string[][];
}

export const PuzzleStore = new Store<IPuzzleStore>({
  startedPuzzle: false,
  finishedPuzzle: false,
  filledBlocks: [],
  originalFilledBlocks: [],
});

createListeners();
