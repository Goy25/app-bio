import { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { DataContext } from "../../General/Context/DataProvider";
import theme from "../../General/theme";
import { handleUpdatePlantAtribute } from "../Utils/handler";

export default function Row({ atribute, editable, label, value, setValue }) {
  const db = useSQLiteContext();
  const { plant } = useContext(DataContext);

  return (
    <View style={[theme.row, { marginTop: 5 }]}>
      <Text style={theme.label}>{label}:</Text>
      <TextInput
        editable={editable}
        onChangeText={(text) =>
          handleUpdatePlantAtribute(db, plant, text, atribute, setValue)
        }
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 2,
    color: "black",
    fontWeight: "600",
    padding: 5,
    width: "80%",
  },
});
