import { AntDesign } from "@expo/vector-icons";

function HideHeader({ style, up, setUp }) {
  return (
    <AntDesign
      onPress={() => setUp(!up)}
      style={style}
      name={up ? "up" : "down"}
      size={40}
      color="white"
    />
  );
}

export default HideHeader;
