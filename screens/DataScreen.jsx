import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
});

export default function DataScreen() {
  return (
    <View style={styles.container}>
      <Text >Data Screen</Text>
    </View>
  );
}