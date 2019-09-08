import { createPullstateCore } from "pullstate";
import { PuzzleStore } from "./puzzle/PuzzleStore";

export const PullstateCore = createPullstateCore({
  PuzzleStore,
});
