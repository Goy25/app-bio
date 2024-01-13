import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  select: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 4,
    borderWidth: 2,
    color: "#151E21",
    padding: 5,
    textAlign: "center",
    width: 150,
  },
});

function Select({ label, items, handleChange, placeholder, style, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        items={items}
        onValueChange={handleChange}
        placeholder={placeholder}
        style={{ inputAndroid: styles.select, placeholder: style }}
        useNativeAndroidPickerStyle={false}
        value={value}
      />
    </View>
  );
}

export default Select;