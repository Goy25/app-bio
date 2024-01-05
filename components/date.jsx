import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Data, Table } from "../utils/context";
import { yearList } from "../utils/getDate";
import { select } from "../utils/query";

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
    width: "49%",
  },
  year: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "49%",
  },
});

function Date() {

  const [month, setMonth] = useState(null);
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
  const [year, setYear] = useState(null);
  const [years] = useState(yearList());

  const handleYearChange = (value) => {
    setYear(value);
    console.log(value);
  }

  return (
    <View style={styles.content}>
      <View style={styles.month}>
        <RNPickerSelect
          items={months}
          onValueChange={(value) => setMonth(value)}
          placeholder={{ label: "Mes", value: null }}
        />
      </View>
      <View style={styles.year}>
        <RNPickerSelect
          items={years}
          onValueChange={handleYearChange}
          placeholder={{ label: "Año", value: null }}
        />
      </View>
    </View>
  );
}

export default Date;
