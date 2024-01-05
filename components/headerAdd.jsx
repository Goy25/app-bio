import { useContext, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Data, Table } from "../utils/context";
import { insert } from "../utils/query";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00C8E0",
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: 80,
    textAlign: "center",
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
});

export default function HeaderAdd() {

  const { db } = useContext(Data);
  const { table, reloadDS, setReloadDS, reloadDates, setReloadDates } = useContext(Table);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [table]);

  const handleCancel = () => {
    setValue("");
    setModal(false);
  };

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setValue(`${date.toISOString().slice(0, 10)}`);
    }
    setShow(false);
  };

  const handlePress = () => {
    setModal(true);
  };

  const handleSave = () => {
    db.transaction((tx) => {
      tx.executeSql(insert[table], [value], () => {
        if (table === "FECHA") {
          setReloadDates(!reloadDates);
        }
      });
    });
    setValue("");
    setModal(false);
    setReloadDS(!reloadDS);
  };

  return (
    <>
      <Pressable style={{marginRight: 10}} onPress={handlePress}>
        <Entypo name="circle-with-plus" size={40} color="white" />
      </Pressable>
      <Modal visible={modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textInput}>{table}{table === "FECHA" ? " AAAA-MM-DD" : ""}</Text>
            <TextInput
              value={value}
              onChangeText={setValue}
              style={styles.textInput}
              onPressIn={table === "FECHA" ? () => setShow(true) : null}
            />
            {show && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                positiveButton={{
                  label: "Aceptar",
                  textColor: "#00C8E0",
                }}
                negativeButton={{
                  label: "Salir",
                  textColor: "#00C8E0",
                }}
                                
              />
            )}
            <View style={styles.buttons}>
              <Pressable style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText} onPress={handleSave}>
                  Guardar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
