import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImagePopUp from "./imagePopUp";
import { Data, Filter } from "../utils/context";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    width: "85%",
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    backgroundColor: "#009658",
    borderRadius: 8,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    width: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

function PlantElement({ plant }) {
  const { day, month, place, year, setPlant } = useContext(Data);
  const { setSearch } = useContext(Filter);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const handlePress = () => {
    if (place < 1) {
      alert("Seleccione un lugar");
      return;
    }
    setPlant(plant);
    setSearch(false);
    navigation.navigate("Info", { name: `${year}-${month}-${day}` });
  };

  return (
    <View style={styles.content}>
      <MaterialIcons
        onPress={() => setVisible(true)}
        style={styles.image}
        name={plant.url === "" ? "image-not-supported" : "image"}
        size={30}
        color="#EDFFF7"
      />
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.text}>{plant.nombre}</Text>
      </Pressable>
      {visible && (
        <ImagePopUp plant={plant} visible={visible} setVisible={setVisible} />
      )}
    </View>
  );
}

export default PlantElement;
