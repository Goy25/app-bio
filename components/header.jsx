import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    width: "100%",
  },
  dateSelect: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 1,
    color: "#151E21",
    padding: 5,
    textAlign: "center",
    width: "100%",
  },
  exportButton: {
    alignItems: "center",
    backgroundColor: "#009658",
    borderRadius: 5,
    justifyContent: "center",
    height: 40,
    width: 40,
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
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <View style={{ width: "42%" }}>
        <RNPickerSelect
          items={firstItems}
          onValueChange={(value) => setFirstValue(value)}
          placeholder={{ label: firstPlacehoder, value: null }}
          style={{ inputAndroid: styles.dateSelect }}
          useNativeAndroidPickerStyle={false}
          value={firstValue}
        />
      </View>
      <View style={{ width: "42%" }}>
        <RNPickerSelect
          items={secondItems}
          onValueChange={(value) => setSecondValue(value)}
          placeholder={{ label: secondPlaceholder, value: null }}
          style={{ inputAndroid: styles.dateSelect }}
          useNativeAndroidPickerStyle={false}
          value={secondValue}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("Export")} style={styles.exportButton}>
        <Foundation name="page-export-csv" size={35} color="#EDFFF7" />
      </Pressable>
    </View>
  );
}

export default Header;
