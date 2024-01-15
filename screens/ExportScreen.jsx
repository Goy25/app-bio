import { ScrollView, StyleSheet, View } from "react-native";
import ExportField from "../components/exportField";
import ImportField from "../components/importField";

import theme from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    gap: 20,
    minHeight: "100%",
    paddingVertical: 20,
  }
});

function ExportScreen() {
  return (
    <View style={[theme.container]}>
      <ScrollView  contentContainerStyle={[styles.container, theme.flexColumnCenter]}>
        <ExportField />
        <ImportField />
      </ScrollView>
    </View>
  );
}

export default ExportScreen;