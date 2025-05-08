import { useState, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Button from "../../General/Components/Button";
import { handleUpdateIndividualAtribute } from "../Utils/handler";
import { TotalContext } from "../Utils/TotalContext";

export default function Percent({ iId, iPercentage, atribute, tipo }) {
  const db = useSQLiteContext();
  const { total, setTotal } = useContext(TotalContext);
  const [percentage, setPercentage] = useState(iPercentage !== null ? iPercentage.toString() : "0");
  const [borderColor, setBorderColor] = useState("#000000");

  const handleUpdate = async (text) => {
    setBorderColor("#000000");
    const res = await handleUpdateIndividualAtribute(
      db,
      text,
      atribute,
      iId,
      total,
      setTotal,
      percentage,
      setPercentage
    );
    if (res == null) return;

    if (res.success) {
      setBorderColor("#00FF00");
    } else {
      setBorderColor("#FF0000");
      alert(`${res.error} tipo`);
    }
  }

  return (
    <View style={styles.percentContent}>
      <Button
        onLongPress={() =>
          handleUpdate((100 - total + parseInt(percentage == '' ? '0' : percentage)).toString())
        }
        text={tipo}
        style={{fontSize: 11}}
      />
      <View style={{ width: "100%" }}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={handleUpdate}
          style={[styles.percentInput, { borderColor }]}
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
