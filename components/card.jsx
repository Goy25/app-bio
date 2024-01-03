import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import AddModal from "./addModal";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { select, update } from "../utils/query";
import defaultImage from "../assets/images/default.png";
import { context } from "../utils/context";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    borderRadius: 10,
    borderColor: "#00C8E0",
    borderWidth: 1,
    padding: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  information: {
    flexGrow: 1,
    gap: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00C8E0",
    width: 140,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00C8E0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  addCard: {
    backgroundColor: "#00C8E0",
    borderRadius: 10,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
});

export function Card({ info }) {
  const [url, setUrl] = useState(
    info.url === "" ? defaultImage : { uri: info.url }
  );
  const navigation = useNavigation();
  const { db, plant } = useContext(context);

  const selectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Se requiere acceso a la galería");
      return;
    }
    const picker = await ImagePicker.launchImageLibraryAsync();
    if (picker.canceled) {
      return;
    }
    setUrl({ uri: picker.assets[0].uri });
    info.url = picker.assets[0].uri;
    db.transaction((tx) => {
      tx.executeSql(update.IMAGE, [picker.assets[0].uri, info.id]);
    });
  };

  const handlePress = () => {
    plant.setter(info);
    navigation.navigate("Info");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{info.nombre}</Text>
      <Pressable onPress={selectImage}>
        <Image source={url} style={styles.image} />
      </Pressable>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.textButton}>Ver más</Text>
      </Pressable>
    </View>
  );
}

export function AddCard({ reload }) {
  const [visible, setVisible] = useState(false);
  const { db, date } = useContext(context);
  const [plants, setPlants] = useState([]);
  const [atributes, setAtributes] = useState([]);

  const handlePress = () => {
    if (date.value.id === 0) {
      alert("Seleccione una fecha");
      return;
    }
    setVisible(true);
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(select.PLANTA, [], (_, { rows: { _array } }) =>
        setPlants(
          _array.map((plant) => ({ label: plant.nombre, value: plant }))
        )
      );
    });
    db.transaction((tx) => {
      tx.executeSql(select.CARACTERISTICA, [], (_, { rows: { _array } }) =>
        setAtributes(
          _array.map((atribute) => ({ label: atribute.tipo, value: atribute }))
        )
      );
    });
  }, [visible]);

  return (
    <>
      <Pressable style={styles.addCard} onPress={handlePress}>
        <Entypo name="circle-with-plus" size={120} color="#151E21" />
      </Pressable>
      <AddModal
        visible={{ value: visible, setter: setVisible }}
        plants={plants}
        atributes={atributes}
        reload={reload}
      />
    </>
  );
}
