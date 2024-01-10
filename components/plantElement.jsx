import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AddButton from "./addButton";
import ImagePopUp from "./imagePopUp";
import { Data, Filter } from "../utils/context";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EBFFFF",
    borderRadius: 8,
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
    alignItems: "center",
    backgroundColor: "#039BB7",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const monthNames = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

function PlantElement({ plant }) {
  const { month, year, setPlant } = useContext(Data);
  const { setSearch } = useContext(Filter);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const handlePress = () => {
    setPlant(plant);
    setSearch(false);
    navigation.navigate("Info", { name: `${monthNames[month]} ${year}` });
  };

  return (
    <View style={styles.content}>
      <Pressable onPress={() => setVisible(true)} style={styles.image}>
        <Entypo name="image" size={30} color="#EBFFFF" />
      </Pressable>
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
