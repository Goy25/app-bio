import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { insertElements } from "../utils/querys";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    width: "100%",
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
        <TextInput
          onChangeText={(text) => setToInsert(text)}
          multiline={true}
          style={styles.text}
          value={toInsert}
        />
      </View>
      <View style={styles.content}>
        <Pressable  onPress={handleCancel} style={{ width: "48%" }}>
          <Text style={theme.button}>Cancelar</Text>
        </Pressable>
        <Pressable onPress={handleSave} style={{ width: "48%" }}>
          <Text style={theme.button}>Guardar</Text>
        </Pressable>
      </View>
    </>
  );
}

export default InsertElements;
