import { StyleSheet, View } from "react-native";
import ExportField from "../components/exportField";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }
});

function ExportScreen() {
  return (
    <View style={[styles.container, theme.container]}>
      <ExportField />
    </View>
  );
}

export default ExportScreen;