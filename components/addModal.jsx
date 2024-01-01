import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { insert } from "../utils/query";
import { context } from "../utils/context";

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#151E21",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addInfo: {
    borderColor: "#00C8E0",
    borderWidth: 1,
    borderRadius: 8,
    width: "70%",
  },
  modalType: {
    display: "flex",
    flexDirection: "row",
  },
  typeLeftButton: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#00C8E0",
    borderTopLeftRadius: 4,
    paddingVertical: 5,
  },
  typeRightButton: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#00A8C0",
    borderTopRightRadius: 4,
    paddingVertical: 5,
  },
  modalSelect: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  modalInput: {
    padding: 10,
    color: "#151E21",
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: "#00C8E0",
    width: "35%",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 5,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});

export default function AddModal({
  visible,
  plants,
  atributes,
  reload,
}) {

  const [plant, setPlant] = useState("")
  const [atribute, setAtribute] = useState("")
  const { db, date } = useContext(context);
  
  const handleCancel = () => {
    visible.setter(false);
    setPlant("");
    setAtribute("");
  };

  const handleAdd = () => {
    if (plant === "" || atribute === "") {
      alert("Ambos campos son obligatorios")
      return
    }
    db.transaction((tx) => {
      tx.executeSql(
        insert.VISTA,
        [plant.id, atribute.id, date.value.id, ""],
        (_) => {
          reload.setter(!reload.value);
          visible.setter(false);
          setPlant("");
          setAtribute("");
        }
      )
    });
  };

  return (
    <Modal visible={visible.value} style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.addInfo}>
          <Text style={styles.modalLabel}>Planta</Text>
          <View style={styles.modalSelect}>
            <RNPickerSelect
              value={plant}
              onValueChange={(value) => setPlant(value)}
              items={plants}
              style={{
                placeholder: {
                  color: "#DDDDDD",
                },
              }}
              placeholder={{
                label: "Selecciona una planta",
                value: "",
              }}
            />
          </View>
          <Text style={styles.modalLabel}>Caracteristica</Text>
          <View style={styles.modalSelect}>
            <RNPickerSelect
              value={atribute}
              onValueChange={(value) => setAtribute(value)}
              items={atributes}
              style={{
                placeholder: {
                  color: "#DDDDDD",
                },
              }}
              placeholder={{
                label: "Selecciona una característica",
                value: "",
              }}
            />
          </View>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalButton} onPress={handleCancel}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.modalButton}>
              <Text style={styles.modalButtonText} onPress={handleAdd}>
                Añadir
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
