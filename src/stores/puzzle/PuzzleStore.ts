import { Store } from "pullstate";
import { createPuzzleListeners } from "./PuzzleListeners";

export enum ECellSelectedState {
  UNSELECTED,
  SELECTED,
  SELECTED_IN_LINE
}

export type TScribbled = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

interface ICellState {
  selectedState: ECellSelectedState;
  wasOriginal: boolean;
  highlight: boolean;
  value: string;
  scribbled: TScribbled;
}

export const emptyScribbled: TScribbled = [false, false, false, false, false, false, false, false, false];
// export const emptyScribbled: TScribbled = [true, true, true, true, true, true, true, true, true];

export interface IPuzzleStore {
  startedPuzzle: boolean;
  finishedPuzzle: boolean;
  filledBlocks: ICellState[][];
  originalFilledBlocks: string[][];
  selectedCell: {
    x: number;
    y: number;
    isEditable: boolean;
    editOrd: number;
  },
  scribbleMode: boolean;
}

export const PuzzleStore = new Store<IPuzzleStore>({
  startedPuzzle: false,
  finishedPuzzle: false,
  filledBlocks: [],
  originalFilledBlocks: [],
  selectedCell: { x: -1, y: -1, isEditable: false, editOrd: 0 },
  scribbleMode: false,
});

createPuzzleListeners(PuzzleStore);
