import { useContext, useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insert, select } from "../query";
import { Context } from "../Navigation";

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

export default function Dates( ) {

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("");
  const db = useContext(Context);

  useEffect(() => {
    console.log(db)
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     select.fecha,
    //     [],
    //     (_, { rows: { _array } }) => setItems(_array.map(date => ({label: date.fecha, value: date.fecha})))
    //   );
    // });
  }, []);

  const handleChange = (value) => {
    setSelected(value);
  }

  const handleOther = (event, date) => {
    const newDate = `${date.toISOString().slice(0, 10)}`
    db.transaction((tx) => {
      tx.executeSql(
        insert.fecha,
        [newDate]
      );
    });
    setSelected(newDate);
  }

  return (
    <View style={styles.content}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={[{label: "Otro", value: "otro"}, ...items]}
        style={{
          placeholder: {
            color: "#DDDDDD",
          },
        }}
        placeholder={{
          label: "Selecciona una fecha",
          value: null,
        }}
      />
      {selected === "otro" && 
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleOther}
        />
      }
    </View>
  );
}
