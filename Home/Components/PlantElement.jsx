import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImagePopUp from "./ImagePopUp";
import { getPhotos } from "../Utils/database";
import { handleSelectPlant } from "../Utils/handler";
import { DataContext } from "../../General/Context/DataProvider";
import { FilterContext } from "../../General/Context/FilterProvider";

export default function PlantElement({ plant }) {
  const db = useSQLiteContext();
  const { day, month, place, year, setPlant } = useContext(DataContext);
  const { setSearch } = useContext(FilterContext);
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getPhotos(db, plant.id, setPhotos);
  }, []);

  return (
    <View style={styles.content}>
      <MaterialIcons
        onPress={() => setVisible(true)}
        style={styles.image}
        name={photos.length < 2 ? "image-not-supported" : "image"}
        size={30}
        color={photos.length < 2 ? "#111111" : "#EDFFF7"}
      />
      <Pressable
        onPress={() =>
          handleSelectPlant(
            place,
            plant,
            setPlant,
            setSearch,
            navigation,
            `${year}-${month}-${day}`
          )
        }
        style={styles.button}
      >
        <Text style={styles.text}>{plant.nombre}</Text>
      </Pressable>
      {visible && (
        <ImagePopUp
          plant={plant}
          photos={photos}
          setPhotos={setPhotos}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </View>
  );
}

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
