import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

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
});

export default function AddModal({
  visible,
  exist,
  value,
  handleAdd,
  handleCancel,
  handleInputChange,
  handleSelectChange,
}) {
  return (
    <Modal visible={visible} style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.addInfo}>
          <View style={styles.modalType}>
            <Pressable
              style={
                exist.value
                  ? styles.typeLeftButton
                  : { ...styles.typeLeftButton, backgroundColor: "#00A8C0" }
              }
              onPress={() => exist.setter(true)}
            >
              <Text style={styles.modalButtonText}>Existente</Text>
            </Pressable>
            <Pressable
              style={
                exist.value
                  ? styles.typeRightButton
                  : { ...styles.typeRightButton, backgroundColor: "#00C8E0" }
              }
            >
              <Text
                style={styles.modalButtonText}
                onPress={() => exist.setter(false)}
              >
                Nuevo
              </Text>
            </Pressable>
          </View>
          <View style={styles.modalSelect}>
            {exist.value ? (
              <RNPickerSelect
                value={value}
                onValueChange={handleSelectChange}
                items={[
                  { label: "Football", value: "football" },
                  { label: "Baseball", value: "baseball" },
                  { label: "Hockey", value: "hockey" },
                ]}
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
            ) : (
              <TextInput
                style={styles.modalInput}
                value={value}
                onChange={handleInputChange}
              />
            )}
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
