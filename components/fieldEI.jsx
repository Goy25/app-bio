import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  exportAll,
  exportPlace,
  exportPlant,
  exportPeriod,
  placeItems,
  plantItems,
  periodItems,
} from "../utils/querys";

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: "#00C8E0",
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  content: {
    alignItems: "center",
    backgroundColor: "#192225",
    borderColor: "#00C8E0",
    borderRadius: 16,
    borderWidth: 3,
    gap: 10,
    padding: 10,
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  select: {
    backgroundColor: "white",
    borderRadius: 8,
    color: "#151E21",
    padding: 5,
    textAlign: "center",
    width: 150,
  },
  title: {
    color: "white",
    includeFontPadding: false,
    fontSize: 20,
    fontWeight: "bold",
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

function Select({ label, items, handleChange, placeholder, style, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        items={items}
        onValueChange={handleChange}
        placeholder={placeholder}
        style={{ inputAndroid: styles.select, placeholder: style }}
        useNativeAndroidPickerStyle={false}
        value={value}
      />
    </View>
  );
}

function FieldEI({ type }) {
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
    if (table !== "all" && id === null) {
      alert("Selecciona un tipo");
      return;
    }
    if (table === "all") exportType[table](csv);
    exportType[table](id, items[index].label, csv);
  };

  useEffect(() => {
    if (table !== "all") getItems[table](setItems);
  }, [table]);

  return (
    <View style={styles.content}>
      {type === "Exportar" && (
        <Select
          label="Exportar a:"
          items={[{ label: "Otro Dispositivo", value: false }]}
          handleChange={setCSV}
          placeholder={{ label: "Excel", value: true }}
          style={{ color: "#151E21" }}
        />
      )}
      <Select
        label={type}
        items={[
          { label: "por Lugar", value: "place" },
          { label: "por Periodo", value: "time" },
          { label: "por Planta", value: "plant" },
        ]}
        handleChange={handleChangeTable}
        placeholder={{ label: "Todo", value: "all" }}
        style={{ color: "#151E21" }}
      />
      {table !== "all" && (
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
        <Text style={styles.buttonText}>Aceptar</Text>
      </Pressable>
    </View>
  );
}

export default FieldEI;
