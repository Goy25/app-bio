import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Select from "./select";
import {
  exportAll,
  exportPlace,
  exportPlant,
  exportPeriod,
  placeItems,
  plantItems,
  periodItems,
} from "../utils/querys";
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
  place: exportPlace,
  plant: exportPlant,
  time: exportPeriod,
};

const getItems = {
  place: placeItems,
  plant: plantItems,
  time: periodItems,
};

function ExportField() {
  const [id, setId] = useState(null);
  const [index, setIndex] = useState(null);
  const [csv, setCSV] = useState(true);
  const [items, setItems] = useState([]);
  const [table, setTable] = useState("all");

  const handleChangeTable = (value) => {
    setTable(value);
    setId(null);
  };

  const handleChangeItem = (value, i) => {
    setId(value);
    setIndex(i - 1);
  };

  const handleAccept = () => {
    if (table === "all") {
      exportType[table](csv);
      return;
    }
    if (id === null) {
      alert("Selecciona un tipo");
      return;
    }
    exportType[table](id, items[index].label, csv);
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
        items={[
          { label: "por Lugar", value: "place" },
          { label: "por Periodo", value: "time" },
          { label: "por Planta", value: "plant" },
        ]}
        handleChange={handleChangeTable}
        placeholder={{ label: "Todo", value: "all" }}
        style={{ color: "#151E21" }}
      />
      {table != "all" && (
        <Select
          label="Tipo:"
          items={items}
          handleChange={handleChangeItem}
          placeholder={{ label: "Seleccionar", value: null }}
          style={{ color: "#151E21" }}
          value={id}
        />
      )}
      <Pressable onPress={handleAccept}>
        <Text style={[theme.button, styles.button]}>Aceptar</Text>
      </Pressable>
    </View>
  );
}

export default ExportField;
