import React, { ReactElement } from "react";
import { createFilled2DArray } from "../../util/util";
import { Cell } from "./Cell";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const PuzzleComponent = () => {
  const rowsOfCells: ReactElement[][] = createFilled2DArray(9, 9, (x, y) => (
    <Cell key={`${x}${y}`} x={x} y={y} />
  ));

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
    backgroundColor: Colors.lighter,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
