import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Select from "./select";
import { pickFile, readFile } from "../utils/importFile";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0ed97f",
    borderRadius: 4,
  },
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

function ImportField() {
  const [table, setTable] = useState("all");
  const [arc, setArc] = useState("");
  const [items, setItems] = useState([]);

  const handleAccept = () => {
    readFile(arc);
  };

  return (
    <View style={styles.content}>
      <Text style={theme.title}>Importar</Text>
      <Select
        label="Importar:"
        items={[
          { label: "por Lugar", value: "place" },
          { label: "por Periodo", value: "time" },
          { label: "por Planta", value: "plant" },
        ]}
        handleChange={setTable}
        placeholder={{ label: "Todo", value: "all" }}
        style={{ color: "#151E21" }}
      />
      <View style={theme.row}>
        <Text style={theme.label}>Directorio:</Text>
        <Pressable onPress={() => pickFile(setItems)}>
          <Text style={[theme.select, {padding: 10}]}>Seleccionar</Text>
        </Pressable>
      </View>
      <Select
        label="Archivo:"
        items={items}
        handleChange={setArc}
        placeholder={{ label: "Selecione archivo", value: "" }}
        style={{}}
      />
      <Pressable onPress={handleAccept}>
        <Text style={[theme.button, styles.button]}>Aceptar</Text>
      </Pressable>
    </View>
  );
}

export default ImportField;