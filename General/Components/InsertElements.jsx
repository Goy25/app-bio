import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
// import { insertElements } from "../utils/querys";
import Button from "./Button";

export default function InsertElements({
  placeholder = "Nombre...",
  query,
  reload,
  setReload,
  setShow,
}) {
  const [toInsert, setToInsert] = useState("");

  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = () => {
  //   if (toInsert === "") {
  //     return;
  //   }
  //   const values = toInsert.split("\n").filter((value) => value !== "");
  //   insertElements(values, query);
  //   setReload(!reload);
  //   setShow(false);
  };

  return (
    <>
      <View style={styles.content}>
        <TextInput
          onChangeText={(text) => setToInsert(text)}
          placeholder={placeholder}
          multiline={true}
          style={styles.text}
          value={toInsert}
        />
      </View>
      <View style={styles.content}>
        <Button onPress={handleCancel} text="Cancelar" style={{ width: "48%" }} />
        <Button onPress={handleSave} text="Guardar" style={{ width: "48%" }} />
      </View>
    </>
  );
}

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
