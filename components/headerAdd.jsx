import { Text, Pressable, StyleSheet } from "react-native";
import { insert } from "../query";

const styles = StyleSheet.create({
  add: {
    color: "#00C8E0",
    fontSize: 30,
    backgroundColor: "white",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 40,
    marginRight: 10,
    width: 30,
    height: 30,
    fontWeight: "bold",
    includeFontPadding: false,
    backfaceVisibility: "hidden",
    lineHeight: 32,
  },
});

export default function HeaderAdd () {
  return (
    <Pressable onPress={() => console.log(insert)}>
      <Text style={styles.add} >+</Text>
    </Pressable>
  );
}