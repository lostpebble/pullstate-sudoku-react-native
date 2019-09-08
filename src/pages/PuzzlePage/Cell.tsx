import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { ECellSelectedState, PuzzleStore } from "../../stores/puzzle/PuzzleStore";
import { uc_tapCell } from "../../stores/puzzle/PuzzleUpdaters";
import { useStoreStateOpt } from "pullstate";
import { Colors } from "../../styles/Colors";

export interface ICellProps {
  x: number;
  y: number;
}

const EDGE_RADIUS = 10;

export const Cell = ({ x, y }: ICellProps) => {
  const [{ wasOriginal, value, highlight, scribbled, selectedState }] = useStoreStateOpt(PuzzleStore, [["filledBlocks", y, x]]);
  const [growAnim] = useState(new Animated.Value(1));

  const cellInlineStyles: StyleProp<ViewStyle> = {};
  const textInlineStyles: StyleProp<TextStyle> = {};

  if (wasOriginal) {
    textInlineStyles.fontFamily = "RedHatDisplay-Medium";
    cellInlineStyles.backgroundColor = "#edecf4";
  } else {
    textInlineStyles.color = Colors.blueAppBackground;
  }

  const selectedAndEditable = selectedState === ECellSelectedState.SELECTED && !wasOriginal;

  useEffect(() => {
    Animated.timing(growAnim, { toValue: selectedAndEditable ? 1.4 : 1, duration: 100 }).start();
  }, [selectedAndEditable]);

  if (x === 0 && y === 0) {
    cellInlineStyles.borderTopLeftRadius = EDGE_RADIUS;
  } else if (x === 8 && y === 0) {
    cellInlineStyles.borderTopRightRadius = EDGE_RADIUS;
  } else if (x === 8 && y === 8) {
    cellInlineStyles.borderBottomRightRadius = EDGE_RADIUS;
  } else if (x === 0 && y === 8) {
    cellInlineStyles.borderBottomLeftRadius = EDGE_RADIUS;
  }

  if (selectedState === ECellSelectedState.SELECTED) {
    if (!wasOriginal) {
      cellInlineStyles.borderColor = "#6ca2c5";
      cellInlineStyles.borderBottomColor = "#4e6794";
      cellInlineStyles.borderTopWidth = 4;
      cellInlineStyles.borderBottomWidth = 4;
      cellInlineStyles.borderLeftWidth = 4;
      cellInlineStyles.borderRightWidth = 4;
      cellInlineStyles.backgroundColor = "#FFFFFF";
      cellInlineStyles.transform = [{
        scale: growAnim as unknown as number,
      }];
      cellInlineStyles.borderRadius = EDGE_RADIUS;
    } else {
      cellInlineStyles.backgroundColor = "#cadaf8";
    }

    cellInlineStyles.zIndex = 5;
  }

  if (highlight) {
    textInlineStyles.fontFamily = "RedHatDisplay-Black";
    textInlineStyles.fontSize = 24;
  }

  if (x === 2 || x === 5) {
    cellInlineStyles.borderRightColor = "#8f99b5";
  }

  if (y === 2 || y === 5) {
    cellInlineStyles.borderBottomColor = "#8f99b5";
  }

  return (
    <Animated.View onTouchStart={() => {
      PuzzleStore.update(uc_tapCell(x, y));
    }} style={[styles.cell, cellInlineStyles]}>
      {value === "." && (<View pointerEvents={"none"} style={styles.scribbleContainer}>{scribbled.map((s, i) => <Text key={i} style={styles.scribbleText}>{s ? i + 1 : ""}</Text>)}</View>)}
      <Text style={[styles.cellText, textInlineStyles]}>{value !== "." ? value : ""}</Text>
    </Animated.View>
  );
};

const cellDimension = Dimensions.get("screen").width / 9.5;

const styles = StyleSheet.create({
  cell: {
    position: "relative",
    display: "flex",
    width: cellDimension,
    height: cellDimension,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: "#d0dae9",
    borderRightColor: "#d0dae9",
    borderTopColor: "#d0dae9",
    borderBottomColor: "#d0dae9",
  },
  cellText: {
    fontSize: 20,
    fontFamily: "RedHatDisplay-Regular",
  },
  scribbleContainer: {
    // padding: 3,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexWrap: "wrap"
  },
  scribbleText: {
    textAlign: "center",
    textAlignVertical: "center",
    width: cellDimension / 4,
    height: cellDimension / 4,
    fontSize: 9,
    fontFamily: "RedHatDisplay-Bold",
    color: Colors.blueAppBackground,
  },
});
