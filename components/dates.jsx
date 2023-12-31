import { useContext, useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { select } from "../utils/query";
import { context } from "../utils/context";

const styles = StyleSheet.create({
  content: {
    width: "100%",
    backgroundColor: "#00C8E0",
    borderRadius: 8,
  },
  otherView: {
    width: "100%",
    padding: 10,
    backgroundColor: "red"
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

export default function Dates(  ) {

  const [items, setItems] = useState([]);
  const { db, date } = useContext(context);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        select.FECHA,
        [],
        (_, { rows: { _array } }) => setItems(_array.map(date => ({label: date.fecha, value: date})))
      );
    });
  }, []);

  const handleChange = (value) => {
    date.setter(value);
  }

  return (
    <View style={styles.content}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={items}
        style={{
          placeholder: {
            color: "#DDDDDD",
          },
          inputAndroid: {
            color: "#FFFFFF",
          },
          inputIOS: {
            color: "#FFFFFF",
          },
        }}
        placeholder={{
          label: "Selecciona una fecha",
          value: {id: 0},
        }}
      />
    </View>
  );
}
