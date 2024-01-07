import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function AddButton({ color, handlePress, size, style = {} }) {
  return (
    <Pressable style={style} onPress={handlePress}>
      <AntDesign name="pluscircle" size={size} color={color} />
    </Pressable>
  );
}

export default AddButton;
