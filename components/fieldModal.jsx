import { useContext, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Data } from "../utils/context";
import { select, insert } from "../utils/query";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00C2CB",
    padding: 10,
    width: "30%",
    borderRadius: 8,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    padding: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    padding: 5,
    color: "#151E21",
  },
  selectContent: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
  },
});

export default function FieldModal({ visible, reload }) {

  const { db, plant, date } = useContext(Data);
  const [fields, setFields] = useState([]);
  const [items, setItems] = useState([]);
  const [text, setText] = useState(`Seleccionados: ${fields.join(", ")}`);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(select.CARACTERISTICA, [], (_, { rows: { _array } }) =>
        setItems(
          _array.map((atribute) => ({ label: atribute.tipo, value: atribute }))
        )
      );
    });
  }, []);

  useEffect(() => {
    setText(`Seleccionados: ${fields.map((field) => field.tipo).join(", ")}`);
  }, [fields]);

  const handleChange = (value) => {
    setFields([...fields, value]);
  };

  const handleSave = () => {
    fields.forEach((field) => {
      db.transaction((tx) => {
        tx.executeSql(
          insert.VISTA,
          [plant.value.id, field.id, date.value.id, ""],
          () => reload.setter(!reload.value)
        );
      });
    });
    visible.setter(false);
  };

  return (
    <Modal visible={visible.value}>
      <View style={styles.container}>
        <View style={styles.selectContent}>
          <RNPickerSelect
            onValueChange={handleChange}
            items={items}
            placeholder={{
              label: "Seleccione campos",
              value: null,
            }}
          />
        </View>
        {fields.length !== 0 && (
          <TextInput style={styles.input} value={text} editable={false} />
        )}
        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => visible.setter(false)}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Añadir</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
