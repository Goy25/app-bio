import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ExportField from "../components/exportField";
import ImportField from "../components/importField";
import Loading from "../components/loading";

import theme from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    gap: 20,
    minHeight: "100%",
    paddingVertical: 20,
  },
});

function ExportScreen() {
  const [loadingText, setLoadingText] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <View style={[theme.container]}>
      <ScrollView
        contentContainerStyle={[styles.container, theme.flexColumnCenter]}
      >
        <ExportField setVisible={setVisible} setText={setLoadingText} />
        <ImportField setVisible={setVisible} setText={setLoadingText} />
      </ScrollView>
      <Loading visible={visible} text={loadingText} />
    </View>
  );
}

export default ExportScreen;
