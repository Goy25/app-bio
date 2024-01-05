import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { select } from "../utils/query";
import { Data, Table } from "../utils/context";

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    width: "100%",
  },
  month: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "40%",
  },
});

function Date() {

  const { db, date } = useContext(Data);
  const { reloadDates } = useContext(Table);
  const [items, setItems] = useState([]);
  const [months] = useState([
    { label: "Enero", value: "01" },
    { label: "Febrero", value: "02" },
    { label: "Marzo", value: "03" },
    { label: "Abril", value: "04" },
    { label: "Mayo", value: "05" },
    { label: "Junio", value: "06" },
    { label: "Julio", value: "07" },
    { label: "Agosto", value: "08" },
    { label: "Septiembre", value: "09" },
    { label: "Octubre", value: "10" },
    { label: "Noviembre", value: "11" },
    { label: "Diciembre", value: "12" },
  ]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(select.FECHA, [], (_, { rows: { _array } }) =>
        setItems(_array.map((date) => ({ label: date.fecha, value: date })))
      );
    });
  }, [reloadDates]);

  const handleChange = (value) => {
    date.setter(value);
  };

  return (
    <View style={styles.content}>
      <View style={styles.month}>
        <RNPickerSelect
          placeholder={{ label: "Mes", value: null }}
          onValueChange={(value) => handleChange(value)}
          items={months}
          style={{ inputAndroid: { color: "#151E21" } }}
        />
      </View>
    </View>
  );
}

export default Date;
