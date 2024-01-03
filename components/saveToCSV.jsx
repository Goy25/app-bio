import { useContext } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Foundation } from '@expo/vector-icons';
import { context } from "../utils/context";
import { toCSV } from "../utils/query";
import { generateContent, createCSV } from "../utils/csv";

export default function SaveToCSV() {
  const { db, plant, date, exportType } = useContext(context);

  const handlePress = () => {
    if (exportType.value === "plant") {
      db.transaction((tx) => {
        tx.executeSql(
          toCSV.plant,
          [plant.value.id, date.value.id],
          (_, { rows: { _array } }) => {
            const content = `${date.value.fecha},${_array
              .map((row) => row.tipo)
              .join(",")}\n${plant.value.nombre},${_array
              .map((row) => row.descripcion)
              .join(",")}`;
            createCSV(content, `${plant.value.nombre}-${date.value.fecha}`);
          }
        );
      });
    } else if (date.value.id !== 0) {
      db.transaction((tx) => {
        tx.executeSql(
          toCSV.date,
          [date.value.id],
          (_, { rows: { _array } }) => {
            createCSV(
              generateContent(_array, date.value.fecha),
              date.value.fecha
            );
          }
        );
      });
    }
    else {
      alert("Debe seleccionar una fecha para exportar");
    }
  };

  return (
    <Pressable style={{marginRight: 10}} onPress={handlePress}>
      <Foundation name="page-export-csv" size={40} color="white" />
    </Pressable>
  );
}
