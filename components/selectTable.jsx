import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#00C8E0",
    width: "100%",
    padding: 5,
    borderRadius: 8,
  },
});

export default function SelectTable({ table }) {
  return (
    <View style={styles.content}>
      <RNPickerSelect
        items={[
          { label: "Plantas", value: "PLANTA" },
          { label: "Caracteristicas", value: "CARACTERISTICA" },
          { label: "Fechas", value: "FECHA" },
        ]}
        onValueChange={(value) => table.setter(value)}
        value={table.value}
        style={{
          inputAndroid: {
            color: "white",
          },
          inputIOS: {
            color: "white",
          },
        }}
      />
    </View>
  );
}
