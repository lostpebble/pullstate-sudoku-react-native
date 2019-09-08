/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { PullstateProvider } from "pullstate";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { MainAppPage } from "./src/pages/MainAppPage";
import { PullstateCore } from "./src/stores/PullstateCore";
import { uc_generateNewSudoku } from "./src/stores/puzzle/PuzzleUpdaters";

const instance = PullstateCore.instantiate({ ssr: false });

instance.stores.PuzzleStore.update(uc_generateNewSudoku("easy"));

const App = () => {
  return (
    <PullstateProvider instance={instance}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MainAppPage />
      </SafeAreaView>
    </PullstateProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;
