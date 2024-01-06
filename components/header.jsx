import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    width: "100%",
  },
  dateSelect: {
    backgroundColor: "white",
    borderRadius: 8,
    color: "#151E21",
    padding: 5,
    textAlign: "center",
    width: "100%",
  },
});

function Header({
  firstItems,
  firstPlacehoder,
  firstValue,
  setFirstValue,
  secondItems,
  secondPlaceholder,
  secondValue,
  setSecondValue,
}) {

  return (
    <View style={styles.content}>
      <View style={{ width: "48%" }}>
        <RNPickerSelect
          items={firstItems}
          onValueChange={(value) => setFirstValue(value)}
          placeholder={{ label: firstPlacehoder, value: null }}
          style={{ inputAndroid: styles.dateSelect }}
          useNativeAndroidPickerStyle={false}
          value={firstValue}
        />
      </View>
      <View style={{ width: "48%" }}>
        <RNPickerSelect
          items={secondItems}
          onValueChange={(value) => setSecondValue(value)}
          placeholder={{ label: secondPlaceholder, value: null }}
          style={{ inputAndroid: styles.dateSelect }}
          useNativeAndroidPickerStyle={false}
          value={secondValue}
        />
      </View>
    </View>
  );
}

export default Header;
