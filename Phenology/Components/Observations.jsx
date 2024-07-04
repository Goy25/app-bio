import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { handleUpdateIndividualObservations } from "../Utils/handler";

export default function Observations({ iId, iObservations }) {
  const db = useSQLiteContext();
  const [observations, setObservations] = useState(iObservations);

  return (
    <View style={styles.observationContent}>
      <Text style={styles.observationText}>Observaciones: </Text>
      <TextInput
        onChangeText={(text) =>
          handleUpdateIndividualObservations(db, iId, text, setObservations)
        }
        style={styles.observationInput}
        value={observations}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  observationContent: {
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: "#003721",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    width: "100%",
  },
  observationInput: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 4,
    borderWidth: 1,
    color: "#151E21",
    paddingHorizontal: 5,
    width: "65%",
  },
  observationText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
