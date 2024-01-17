import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Select from "./select";
import { exportAll, exportPeriod, periodItems } from "../utils/querys";
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

const exportType = {
  all: exportAll,
  time: exportPeriod,
};

const getItems = {
  time: periodItems,
};

function ExportField({ setVisible, setText }) {
  const [id, setId] = useState(null);
  const [index, setIndex] = useState(0);
  const [csv, setCSV] = useState(true);
  const [items, setItems] = useState([]);
  const [table, setTable] = useState("all");
  const [title, setTitle] = useState("Todo");

  const handleChangeTable = (value) => {
    setTable(value);
    setId(null);
    setTitle(value === "all" ? "Todo" : "");
  };

  const handleChangeItem = (value, i) => {
    setId(value);
    if (i > 0) {
      setTitle(items[i - 1].label);
      setIndex(i - 1);
    }
  };

  const handleAccept = () => {
    setText("Exportando...")
    setVisible(true);
    if (table === "all") {
      exportType[table](title, csv, setVisible);
      return;
    }
    if (id === null) {
      alert("Selecciona un periodo");
      return;
    }
    if (title === "") {
      alert("Ingresa un nombre para el archivo");
      return;
    }
    exportType[table](id, title, items[index].label, csv, setVisible);
  };

  useEffect(() => {
    if (table !== "all") getItems[table](setItems);
  }, [table]);

  return (
    <View style={styles.content}>
      <Text style={theme.title}>Exportar</Text>
      <Select
        label="Exportar a:"
        items={[{ label: "Otro Dispositivo", value: false }]}
        handleChange={setCSV}
        placeholder={{ label: "Excel", value: true }}
        style={{ color: "#151E21" }}
      />
      <Select
        label="Exportar"
        items={[{ label: "por Periodo", value: "time" }]}
        handleChange={handleChangeTable}
        placeholder={{ label: "Todo", value: "all" }}
        style={{ color: "#151E21" }}
      />
      {table != "all" && (
        <Select
          label="Periodo:"
          items={items}
          handleChange={handleChangeItem}
          placeholder={{ label: "Seleccionar", value: null }}
          style={{ color: "#151E21" }}
          value={id}
        />
      )}
      <View style={theme.row}>
        <Text style={theme.label}>Nombre Archivo:</Text>
        <TextInput onChangeText={setTitle} style={theme.select} value={title} />
      </View>
      <Pressable onPress={handleAccept}>
        <Text style={[theme.button, styles.button]}>Exportar</Text>
      </Pressable>
    </View>
  );
}

export default ExportField;
