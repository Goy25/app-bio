import { Text, View } from "react-native";
import Picker from "./picker";
import theme from "../utils/theme";

function Select({ label, items, handleChange, placeholder, value }) {
  return (
    <View style={theme.row}>
      <Text style={theme.label}>{label}</Text>
      <Picker
        handleChange={handleChange}
        items={items}
        placeholder={placeholder.label}
        placeholderValue={placeholder.value}
        style={theme.select}
        value={value}
      />
    </View>
  );
}

export default Select;
