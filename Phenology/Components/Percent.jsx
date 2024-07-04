import { useState, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Button from "../../General/Components/Button";
import { handleUpdateIndividualAtribute } from "../Utils/handler";
import { TotalContext } from "../Utils/TotalContext";

export default function Percent({ iId, iPercentage, atribute, tipo }) {
  const db = useSQLiteContext();
  const { total, setTotal } = useContext(TotalContext);
  const [percentage, setPercentage] = useState(iPercentage.toString());

  const handleUpdate = (text) =>
    handleUpdateIndividualAtribute(
      db,
      text,
      atribute,
      iId,
      total,
      setTotal,
      percentage,
      setPercentage
    );

  return (
    <View style={styles.percentContent}>
      <Button
        onLongPress={() =>
          handleUpdate((100 - total + parseInt(percentage)).toString())
        }
        text={tipo}
        style={{fontSize: 11}}
      />
      <View style={{ width: "100%" }}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={handleUpdate}
          style={styles.percentInput}
          value={percentage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  percentContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 5,
    width: "18%",
  },
  percentInput: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 4,
    borderWidth: 1,
    color: "#151E21",
    fontSize: 13,
    paddingVertical: 5,
    textAlign: "center",
    width: "100%",
  },
  percentTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
});
