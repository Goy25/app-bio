import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { context } from "../utils/context";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
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
    backgroundColor: "#00C8E0",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  NPEButton: {
    backgroundColor: "#00C8E0",
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const query = "INSERT INTO PLANTA (nombre) VALUES(?);";

export function NewPlantElement({ reload, setReload, setShow }) {

  const { db } = useContext(context);
  const [toInsert, setToInsert] = useState("");

  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = () => {
    if (toInsert === "") {
      return;
    }
    const values = toInsert.split("\n").filter((value) => value !== "");
    db.transaction((tx) => {
      values.forEach((value) => {
        tx.executeSql(query, [value.trim()]);
      });
    });
    setReload(!reload);
    setShow(false);
  };

  return (
    <>
      <View style={styles.content}>
        <Pressable style={[styles.button, {width: "100%"}]}>
          <TextInput
            onChangeText={(text) => setToInsert(text)}
            multiline={true}
            style={styles.text}
            value={toInsert}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Pressable onPress={handleCancel} style={{ width: "48%" }}>
          <Text style={styles.NPEButton}>
            Cancelar
          </Text>
        </Pressable>
        <Pressable onPress={handleSave} style={{ width: "48%" }}>
          <Text style={styles.NPEButton}>Guardar</Text>
        </Pressable>
      </View>
    </>
  );
}

function PlantElement({ plant }) {
  return (
    <View style={styles.content}>
      <Pressable style={styles.image}>
        <Entypo name="image" size={30} color="white" />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>{plant.nombre}</Text>
      </Pressable>
    </View>
  );
}

export default PlantElement;
