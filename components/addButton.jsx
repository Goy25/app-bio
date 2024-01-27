import { AntDesign } from "@expo/vector-icons";

function AddButton({ color, handlePress, size, style = {} }) {
  return (
    <AntDesign
      onPress={handlePress}
      style={style}
      name="pluscircle"
      size={size}
      color={color}
    />
  );
}

export default AddButton;
