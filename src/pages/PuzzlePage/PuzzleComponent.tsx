import React, { ReactElement } from "react";
import { createFilled2DArray } from "../../util/util";
import { Cell } from "./Cell";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const PuzzleComponent = () => {
  /*const { PuzzleStore } = PullstateCore.useStores();
  const [filledBlocks, originalFilledBlocks, selectedCell] = useStoreStateOpt(
    PuzzleStore,
    [["filledBlocks"], ["originalFilledBlocks"], ["selectedCell"]],
  );*/

  /*const selectedNumber =
    selectedCell.x !== -1 && filledBlocks[selectedCell.y][selectedCell.x] !== "."
      ? filledBlocks[selectedCell.y][selectedCell.x]
      : "";*/

  const rowsOfCells: ReactElement[][] = createFilled2DArray(9, 9, (x, y) => {
    // const filledValue = filledBlocks[y][x] !== "." ? filledBlocks[y][x] : "";

    return (
      <Cell
        // makeBold={selectedNumber === filledValue}
        // state={
        //   selectedCell.x === x && selectedCell.y === y
        //     ? ECellSelectedState.SELECTED
        //     : selectedCell.x === x || selectedCell.y === y
        //     ? ECellSelectedState.SELECTED_IN_LINE
        //     : ECellSelectedState.UNSELECTED
        // }
        key={`${x}${y}`}
        x={x}
        y={y}
        // wasOriginal={originalFilledBlocks[y][x] !== "."}
        // filledValue={filledValue}
      />
    );
  });

  return (
    <View style={styles.puzzleContainer}>
      {rowsOfCells.map((row, index) => (
        <View style={styles.puzzleRow} key={index}>
          {row}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  puzzleRow: {
    display: "flex",
    flexDirection: "row",
  },
  puzzleContainer: {
    borderRadius: 10,
    // overflow: "hidden",
    backgroundColor: Colors.lighter,
  },
});
