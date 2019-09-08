import React from "react";
import {
  View,
  Animated,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";
import { allowedValuesArr, uc_editCell } from "../../stores/puzzle/PuzzleUpdaters";
import Icon from "react-native-vector-icons/Ionicons";
import { useStoreStateOpt } from "pullstate";
import { PuzzleStore } from "../../stores/puzzle/PuzzleStore";
import { CheckBox } from "react-native-elements";
import { Colors } from "../../styles/Colors";

export const InputArea = () => {
  const [selectedCell, scribbleMode] = useStoreStateOpt(PuzzleStore, [
    ["selectedCell"],
    ["scribbleMode"],
  ]);

  return (
    <Animated.View style={styles.inputButtonContainer}>
      <View>
        <CheckBox
          title="Scribble Mode"
          checked={scribbleMode}
          onPress={() => {
            PuzzleStore.update((s, o) => {
              s.scribbleMode = !o.scribbleMode;
            });
          }}
        />
      </View>
      <View style={styles.inputButtonRow}>
        {allowedValuesArr.slice(0, 5).map(val => (
          <TouchableOpacity
            key={val}
            disabled={!selectedCell.isEditable}
            style={[styles.inputButton, { opacity: selectedCell.isEditable ? 1 : 0.65 }]}
            onPress={() => {
              PuzzleStore.update(uc_editCell(val));
            }}>
            {val === "" ? (
              <Icon name="md-close" size={30} />
            ) : (
              <Text style={styles.inputButtonText}>{val}</Text>
            )}
          </TouchableOpacity>
          // <InputButton editable={selectedCell.isEditable} key={val} val={val} />
        ))}
      </View>
      <View style={styles.inputButtonRow}>
        {allowedValuesArr.slice(5, 10).map(val => (
          <TouchableOpacity
            key={val}
            disabled={!selectedCell.isEditable}
            style={[styles.inputButton, { opacity: selectedCell.isEditable ? 1 : 0.65 }]}
            onPress={() => {
              PuzzleStore.update(uc_editCell(val));
            }}>
            {val === "" ? (
              <Icon name="md-close" size={30} />
            ) : (
              <Text style={styles.inputButtonText}>{val}</Text>
            )}
          </TouchableOpacity>
          // <InputButton editable={selectedCell.isEditable} key={val} val={val} />
        ))}
      </View>
    </Animated.View>
  );
};

export const InputButton = ({
  val,
  editable,
}: {
  val: string;
  editable: boolean;
}) => {
  return (
    <View>

    </View>
  );
};

const cellDimension = Dimensions.get("screen").width / 6;

const styles = StyleSheet.create({
  inputButtonContainer: {
    marginTop: 25,
    display: "flex",
    flexDirection: "column",
  },
  inputButtonRow: {
    display: "flex",
    flexDirection: "row",
  },
  inputButton: {
    borderRadius: 10,
    margin: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: cellDimension,
    height: cellDimension,
    backgroundColor: "#f6f6f6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  inputButtonText: {
    fontFamily: "RedHatDisplay-Bold",
    fontSize: 30,
  },
  checkBoxStyle: {
    backgroundColor: Colors.blueAppBackground,
  },
});
