import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function NewPlant({ handlePress }) {
  return (
    <Pressable
      style={{
        backgroundColor: "white",
        borderRadius: 25,
        position: "absolute",
        bottom: 10,
        right: 10,
      }}
      onPress={handlePress}
    >
      <AntDesign name="pluscircle" size={50} color="#00C8E0" />
    </Pressable>
  );
}

export default NewPlant;
