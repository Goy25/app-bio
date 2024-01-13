import { StyleSheet, View } from "react-native";
import ExportField from "../components/exportField";
import ImportField from "../components/importField";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
  }
});

function ExportScreen() {
  return (
    <View style={[styles.container, theme.container]}>
      <ExportField />
      <ImportField />
    </View>
  );
}

export default ExportScreen;