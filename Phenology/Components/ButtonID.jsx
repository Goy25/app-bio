import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../General/theme";

export default function ButtonID({ setShow }) {
  return (
    <Pressable style={styles.button} onPress={() => setShow((prev) => !prev)}>
      <Text style={[theme.button, styles.buttonText]}>ID</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    height: 40,
    width: 40,
  },
  buttonText: {
    backgroundColor: "#0ed97f",
    borderRadius: 4,
  },
});