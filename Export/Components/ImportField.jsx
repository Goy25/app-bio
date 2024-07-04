import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Button from "../../General/Components/Button";
import Select from "./Select";
import { handlePickFile, handleReadFile } from "../Utils/handler";
import theme from "../../General/theme";

export default function ImportField({ setVisible, setText }) {
  const db = useSQLiteContext();
  const [arc, setArc] = useState("");
  const [items, setItems] = useState([]);

  return (
    <View style={styles.content}>
      <Text style={theme.title}>Importar</Text>
      <View style={theme.row}>
        <Text style={theme.label}>Directorio:</Text>
        <Button
          onPress={() => handlePickFile(setItems, setArc)}
          text="Seleccionar"
          style={{ ...theme.select, padding: 10 }}
          width={150}
        />
      </View>
      <Select
        label="Archivo:"
        items={items}
        handleChange={setArc}
        placeholder={{ label: "Selecione archivo", value: "" }}
        value={arc}
      />
      <Button text="Importar" onPress={() => handleReadFile(db, arc, setVisible, setText, setArc)} bgColor="#0ed97f" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#009658",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 2,
    gap: 20,
    padding: 20,
    width: "85%",
  },
});
