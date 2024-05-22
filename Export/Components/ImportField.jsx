import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../../General/Components/Button";
import Select from "./Select";
// import { pickFile, readFile } from "../utils/importFile";
import theme from "../../General/theme";

export default function ImportField({ setVisible, setText }) {
  const [arc, setArc] = useState("");
  const [items, setItems] = useState([]);

  const handleAccept = () => {
    if (arc === "") {
      alert("Seleccione un archivo");
      return;
    }
    readFile(arc, setVisible, setArc);
    setText("Importando...");
    setVisible(true);
  };

  return (
    <View style={styles.content}>
      <Text style={theme.title}>Importar</Text>
      <View style={theme.row}>
        <Text style={theme.label}>Directorio:</Text>
        <Button
          onPress={() => pickFile(setItems, setArc)}
          text="Seleccionar"
          style={{ ...theme.select, padding: 10 }}
        />
      </View>
      <Select
        label="Archivo:"
        items={items}
        handleChange={setArc}
        placeholder={{ label: "Selecione archivo", value: "" }}
        style={{}}
        value={arc}
      />
      <Button text="Importar" onPress={handleAccept} bgColor="#0ed97f" />
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
