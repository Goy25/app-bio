import { StyleSheet, Text, View, Pressable } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  content: {
    width: "100%",
    backgroundColor: "#00C8E0",
    borderRadius: 10,
  },
});

export default function Dates() {

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <View style={styles.content}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={[
          { label: 'Football', value: 'football' },
          { label: 'Baseball', value: 'baseball' },
          { label: 'Hockey', value: 'hockey' },
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
    </View>
  );
}
