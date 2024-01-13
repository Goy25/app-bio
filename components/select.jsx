import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import theme from "../utils/theme";

function Select({ label, items, handleChange, placeholder, style, value }) {
  return (
    <View style={theme.row}>
      <Text style={theme.label}>{label}</Text>
      <RNPickerSelect
        items={items}
        onValueChange={handleChange}
        placeholder={placeholder}
        style={{ inputAndroid: theme.select, placeholder: style }}
        useNativeAndroidPickerStyle={false}
        value={value}
      />
    </View>
  );
}

export default Select;