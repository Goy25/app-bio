import { StyleSheet, View } from "react-native";
import FieldEI from "../components/fieldEI";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#063646",
    padding: 20,
    gap: 20,
    height: "100%",
    width: "100%",
  }
});

function ExportScreen() {
  return (
    <View style={styles.container}>
      <FieldEI type="Exportar" />
      <FieldEI type="Importar" />
    </View>
  );
}

export default ExportScreen;