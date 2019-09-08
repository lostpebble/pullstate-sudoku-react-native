import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useStoreStateOpt } from "pullstate";
import { PullstateCore } from "../stores/PullstateCore";
import { PuzzleComponent } from "./PuzzlePage/PuzzleComponent";
import { uc_generateNewSudoku } from "../stores/puzzle/PuzzleUpdaters";

export const MainAppPage = () => {
  const { PuzzleStore } = PullstateCore.useStores();
  const [started, finished] = useStoreStateOpt(PuzzleStore, [
    ["startedPuzzle"],
    ["finishedPuzzle"],
  ]);

  return (
    <View>
      {/*<Text>Hello: {started ? "STARTED" : "NOT STARTED"}</Text>*/}
      {started ? (
        <View style={styles.mainContentContainer}>
          <PuzzleComponent />
        </View>
      ) : (
        <Button
          title={"Start"}
          onPress={() => {
            PuzzleStore.update(uc_generateNewSudoku("easy"));
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
