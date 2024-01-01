import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import AddModal from "./addModal";
import Check from "../assets/images/check.png";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  information: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  name: {
    color: "#00C8E0",
    margin: 0,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 8,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: "100%",
    borderRadius: 8,
    padding: 10,
    borderColor: "#00C8E0",
    borderWidth: 3,
    color: "#151E21",
  },
  addField: {
    padding: 10,
    backgroundColor: "#00C8E0",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  addFieldText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function Field({ info }) {
  const [text, setText] = useState(info.descripcion);

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Text style={styles.name}>{info.tipo}</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </View>
    </View>
  );
}

export function AddField({ handlePress }) {

  return (
    <Pressable style={styles.addField} onPress={handlePress}>
      <Text style={styles.addFieldText}>Agregar campo</Text>
    </Pressable>
  );
}
