import { StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import theme from "../../General/theme";

export default function ImageActions({
  handlePrevious,
  handleDownload,
  handleNext,
}) {
  return (
    <View style={[theme.row, { justifyContent: "center" }]}>
      <Entypo
        name="arrow-with-circle-left"
        size={40}
        color="white"
        onPress={handlePrevious}
        style={[styles.button, { borderBottomLeftRadius: 16 }]}
      />
      <Entypo
        name="download"
        size={40}
        color="white"
        onPress={handleDownload}
        style={styles.button}
      />
      <Entypo
        name="arrow-with-circle-right"
        size={40}
        color="white"
        onPress={handleNext}
        style={[styles.button, { borderBottomRightRadius: 16 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#003721",
    textAlign: "center",
    padding: 5,
    width: 100,
  },
});
