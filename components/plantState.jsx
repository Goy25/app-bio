import { createContext, useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Data } from "../utils/context";
import { updatePhenology } from "../utils/querys";

const Total = createContext();

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    backgroundColor: "#039BB7",
    borderColor: "#EBFFFF",
    borderRadius: 8,
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  observationContent: {
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    width: "100%",
  },
  observationInput: {
    backgroundColor: "white",
    borderRadius: 4,
    color: "#151E21",
    paddingHorizontal: 5,
    width: "65%",
  },
  observationText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  percentContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "18%",
  },
  percentInput: {
    backgroundColor: "white",
    borderRadius: 4,
    color: "#151E21",
    fontSize: 13,
    paddingVertical: 5,
    textAlign: "center",
    width: "100%",
  },
  percentsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
    width: "100%",
  },
  percentTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  tittle: {
    borderBottomColor: "#EBFFFF",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
    color: "#EBFFFF",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },
});

const percents = [
  { label: "10%", value: 10 },
  { label: "20%", value: 20 },
  { label: "30%", value: 30 },
  { label: "40%", value: 40 },
  { label: "50%", value: 50 },
  { label: "60%", value: 60 },
  { label: "70%", value: 70 },
  { label: "80%", value: 80 },
  { label: "90%", value: 90 },
  { label: "100%", value: 100 },
];

function Observations({ iId, iObservations }) {
  const [observations, setObservations] = useState(iObservations);

  const handelChange = (text) => {
    setObservations(text);
    updatePhenology(
      "UPDATE INDIVIDUO SET observaciones = ? WHERE id = ?;",
      text,
      iId
    );
  };

  return (
    <View style={styles.observationContent}>
      <Text style={styles.observationText}>Observaciones: </Text>
      <TextInput
        onChangeText={handelChange}
        style={styles.observationInput}
        value={observations}
      />
    </View>
  );
}

function Percent({ iId, iPercentage, query, tipo }) {
  const { total, setTotal } = useContext(Total);
  const [items, setItems] = useState(percents);
  const [percentage, setPercentage] = useState(iPercentage);

  const handelChange = (value) => {
    setTotal(total + value - percentage);
    setPercentage(value);
  };

  useEffect(() => updatePhenology(query, percentage, iId), [percentage]);

  useEffect(() => {
    setItems(
      percents.filter((item) => {
        return item.value <= 100 - total + percentage;
      })
    );
  }, [total]);

  return (
    <View style={styles.percentContent}>
      <Text style={styles.percentTitle}>{tipo}</Text>
      <View style={{ width: "100%" }}>
        <RNPickerSelect
          items={items}
          onValueChange={handelChange}
          placeholder={{ label: "0%", value: 0 }}
          style={{
            inputAndroid: styles.percentInput,
            placeholder: {
              color: "#151E21",
              fontSize: 13,
              textAlign: "center",
            },
          }}
          useNativeAndroidPickerStyle={false}
          value={percentage}
        />
      </View>
    </View>
  );
}

function PlantState({ phenology }) {
  const { plant } = useContext(Data);
  const [total, setTotal] = useState(
    phenology.esteril +
      phenology.brotes +
      phenology.flores +
      phenology.frutosInmaduros +
      phenology.frutosMaduros
  );

  return (
    <Pressable style={styles.content} >
      <Text style={styles.tittle}>{plant.nombre} - Fenologia</Text>
      <View style={styles.percentsContainer}>
        <Total.Provider value={{ total, setTotal }}>
          <Percent
            iId={phenology.id}
            iPercentage={phenology.esteril}
            tipo={"Esteril"}
            query="UPDATE INDIVIDUO SET esteril = ? WHERE id = ?;"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.brotes}
            tipo={"Brotes Florales"}
            phenology={phenology}
            query="UPDATE INDIVIDUO SET brotes = ? WHERE id = ?;"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.flores}
            tipo="Flores"
            query="UPDATE INDIVIDUO SET flores = ? WHERE id = ?;"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.frutosInmaduros}
            tipo="Frutos Inmaduros"
            query="UPDATE INDIVIDUO SET frutosInmaduros = ? WHERE id = ?;"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.frutosMaduros}
            tipo="Frutos Maduros"
            query="UPDATE INDIVIDUO SET frutosMaduros = ? WHERE id = ?;"
          />
        </Total.Provider>
      </View>
      <Observations
        iId={phenology.id}
        iObservations={phenology.observaciones}
      />
    </Pressable>
  );
}

export default PlantState;
