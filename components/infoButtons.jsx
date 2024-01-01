import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addField: {
    padding: 10,
    backgroundColor: "#00C8E0",
    width: "45%",
    borderRadius: 8,
    alignItems: "center",
  },
  addFieldText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function InfoButtons ( { handleAdd, handleSave } ) {
  return (
    <View style={styles.content}>
      <Pressable style={styles.addField} onPress={handleAdd}>
        <Text style={styles.addFieldText}>Agregar campo</Text>
      </Pressable>
      <Pressable style={styles.addField} onPress={handleSave}>
        <Text style={styles.addFieldText}>Guardar</Text>
      </Pressable>
    </View>
  );
}