import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({
  bgColor = "#009658",
  onLongPress,
  onPress,
  text = "Click",
  textColor = "white",
  style = {},
  width = "100%",
}) {
  return (
    <Pressable onLongPress={onLongPress} onPress={onPress}>
      <Text
        style={[
          styles.button,
          { backgroundColor: bgColor, color: textColor, width },
          style,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});
