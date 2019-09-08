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
}
