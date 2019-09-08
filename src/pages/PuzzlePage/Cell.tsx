import React from "react";
import { Dimensions, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { ECellSelectedState, PuzzleStore } from "../../stores/puzzle/PuzzleStore";
import { uc_tapCell } from "../../stores/puzzle/PuzzleUpdaters";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useStoreStateOpt } from "pullstate";

export interface ICellProps {
  x: number;
  y: number;
}

export const Cell = ({ x, y }: ICellProps) => {
  const [{ wasOriginal, value, highlight, scribbled, selectedState }] = useStoreStateOpt(PuzzleStore, [["filledBlocks", y, x]]);

  const viewStyle: StyleProp<ViewStyle> = {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: "#d0dae9",
    borderRightColor: "#d0dae9",
    borderTopColor: "#d0dae9",
    borderBottomColor: "#d0dae9",
  };
  const textStyle: StyleProp<TextStyle> = {};

  if (wasOriginal) {
    textStyle.fontFamily = "RedHatDisplay-Medium";
    viewStyle.backgroundColor = "#edecf4";
  }

  if (selectedState === ECellSelectedState.SELECTED) {
    if (!wasOriginal) {
      viewStyle.borderColor = "#6ca2c5";
      viewStyle.borderBottomColor = "#4e6794";
      viewStyle.borderTopWidth = 4;
      viewStyle.borderBottomWidth = 4;
      viewStyle.borderLeftWidth = 4;
      viewStyle.borderRightWidth = 4;
      viewStyle.backgroundColor = Colors.white;
      viewStyle.transform = [{
        scale: 1.2,
      }];
      viewStyle.borderRadius = 10;
    } else {
      viewStyle.backgroundColor = "#cadaf8";
    }

    viewStyle.zIndex = 5;
  }

  if (highlight) {
    textStyle.fontFamily = "RedHatDisplay-Black";
    textStyle.fontSize = 24;
  }

  if (x === 2 || x === 5) {
    viewStyle.borderRightColor = "#8f99b5";
  }

  if (y === 2 || y === 5) {
    viewStyle.borderBottomColor = "#8f99b5";
  }

  return (
    <View onTouchStart={() => {
      PuzzleStore.update(uc_tapCell(x, y));
    }} style={[styles.cell, viewStyle]}>
      <Text style={[styles.cellText, textStyle]}>{value !== "." ? value : ""}</Text>
    </View>
  );
};

const cellDimension = Dimensions.get("screen").width / 9;

const styles = StyleSheet.create({
  cell: {
    display: "flex",
    width: cellDimension,
    height: cellDimension,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 20,
    fontFamily: "RedHatDisplay-Regular",
  }
});
