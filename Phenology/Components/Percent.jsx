import { useState, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../../General/Components/Button";
import { TotalContext } from "./PlantState";
// import { update } from "../utils/querys";

export default function Percent({ iId, iPercentage, query, tipo }) {
  const { total, setTotal } = useContext(TotalContext);
  const [percentage, setPercentage] = useState(iPercentage.toString());

  const handleChange = (value) => {
    if ([" ", ".", ",", "-"].some((e) => value.includes(e))) {
      return;
    }
    if (value === "") {
      update(query, 0, iId);
      setTotal(total - percentage);
      setPercentage("");
      return;
    }
    let number = parseInt(value);
    const np = percentage === "" ? 0 : parseInt(percentage);
    if (number > 100 - total + np) {
      number = 100 - total + np;
    }
    setTotal(total - percentage + number);
    setPercentage(number.toString());
    // update(query, number, iId);
  };

  return (
    <View style={styles.percentContent}>
      <Button
        onLongPress={() =>
          handleChange((100 - total + parseInt(percentage)).toString())
        }
        text={tipo}
      />
      <View style={{ width: "100%" }}>
        <TextInput
          keyboardType="number-pad"
          onChangeText={handleChange}
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
