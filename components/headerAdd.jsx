import { useContext, useEffect, useState } from "react";
import { Text, Pressable, StyleSheet, Modal, View, TextInput } from "react-native";
import { insert } from "../utils/query";
import { context, tableContext } from "../utils/context";
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  add: {
    color: "#00C8E0",
    fontSize: 30,
    backgroundColor: "white",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 40,
    marginRight: 10,
    width: 30,
    height: 30,
    fontWeight: "bold",
    includeFontPadding: false,
    backfaceVisibility: "hidden",
    lineHeight: 32,
  },
  modalContainer: {
    backgroundColor: "#151E21",
    height: "100%",
    width: "100%",
    padding: 20,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#00C8E0",
    borderRadius: 8,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    color: "#151E21",
    margin: 5,
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#00C8E0",
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: 80,
    textAlign: "center",
  },
});

export default function HeaderAdd() {
  const [table, setTable] = useContext(tableContext);
  const db = useContext(context);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [table]);

  const handlePress = () => {
    setModal(true);
  };

  const handleSave = () => {
    db.transaction((tx) => {
      tx.executeSql(
        insert[table],
        [value]
      );
    });
    setModal(false);
  }

  return (
    <>
      <Pressable onPress={handlePress}>
        <Text style={styles.add}>+</Text>
      </Pressable>
      <Modal visible={modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={value}
              onChangeText={setValue}
              style={styles.textInput}
              onPressIn={table === "FECHA" ? () => console.log("hola") : null }
            />
            {
              table === "FECHA" &&
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => setValue(`${date.toISOString().slice(0, 10)}`)}
              />
            }
            <View style={styles.buttons}>
              <Pressable style={styles.button} onPress={() => setModal(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText} onPress={handleSave}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
