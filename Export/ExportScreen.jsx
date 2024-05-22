import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ExportField from "./Components/ExportField";
import ImportField from "./Components/ImportField";
import Loading from "./Components/Loading";
import theme from "../General/theme";

export default function ExportScreen() {
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

const styles = StyleSheet.create({
  container: {
    gap: 20,
    minHeight: "100%",
    paddingVertical: 20,
  },
});