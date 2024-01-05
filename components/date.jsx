import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { select } from "../utils/query";
import { context, tableContext } from "../utils/context";

const styles = StyleSheet.create({
  content: {
    width: "100%",
    backgroundColor: "#00C8E0",
    borderRadius: 8,
  },
  otherView: {
    width: "100%",
    padding: 10,
    backgroundColor: "red",
  },
  inputDate: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  acceptButton: {
    padding: 10,
    backgroundColor: "#00C8E0",
    alignItems: "center",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  acceptText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

function Date() {

  const { db, date } = useContext(context);
  const { reloadDates } = useContext(tableContext);
  const [items, setItems] = useState([]);
  const [ months ] = useState([
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

    </View>
  );
}

export default Date;