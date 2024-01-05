import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AddModal from "./addModal";
import defaultImage from "../assets/images/default.png";
import { Data } from "../utils/context";
import { select, update } from "../utils/query";

const styles = StyleSheet.create({
  addCard: {
    backgroundColor: "#00C8E0",
    borderRadius: 10,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
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
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00C8E0",
    width: 140,
    textAlign: "center",
  },
});

export function Card({ info }) {

  const { db, plant } = useContext(Data);
  const [url, setUrl] = useState(
    info.url === "" ? defaultImage : { uri: info.url }
  );
  const navigation = useNavigation();

  const handlePress = () => {
    plant.setter(info);
    navigation.navigate("Info");
  };

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

  const { db, date } = useContext(Data);
  const [atributes, setAtributes] = useState([]);
  const [plants, setPlants] = useState([]);
  const [visible, setVisible] = useState(false);

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

  const handlePress = () => {
    if (date.value.id === 0) {
      alert("Seleccione una fecha");
      return;
    }
    setVisible(true);
  };

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
