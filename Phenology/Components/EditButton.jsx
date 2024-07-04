import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditButton({ editable, setEditable }) {
  return (
    <MaterialIcons
      style={[styles.button, editable ? {} : { backgroundColor: "#0ED97F" }]}
      onPress={() => setEditable(!editable)}
      name="edit"
      size={40}
      color="white"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    height: 40,
    width: 40,
  },
});