import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { insertElements } from "../utils/querys";

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

function InsertElements({ query, reload, setReload, setShow }) {
  const [toInsert, setToInsert] = useState("");

  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = () => {
    if (toInsert === "") {
      return;
    }
    const values = toInsert.split("\n").filter((value) => value !== "");
    insertElements(values, query);
    setReload(!reload);
    setShow(false);
  };

  return (
    <>
      <View style={styles.content}>
        <Pressable style={[styles.button, { width: "100%" }]}>
          <TextInput
            onChangeText={(text) => setToInsert(text)}
            multiline={true}
            style={styles.text}
            value={toInsert}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Pressable  onPress={handleCancel} style={{ width: "48%" }}>
          <Text style={styles.NPEButton}>Cancelar</Text>
        </Pressable>
        <Pressable onPress={handleSave} style={{ width: "48%" }}>
          <Text style={styles.NPEButton}>Guardar</Text>
        </Pressable>
      </View>
    </>
  );
}

export default InsertElements;
