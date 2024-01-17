import { createContext, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { update } from "../utils/querys";

const Total = createContext();

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    backgroundColor: "#009658",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
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
});

function Observations({ iId, iObservations }) {
  const [observations, setObservations] = useState(iObservations);

  const handelChange = (text) => {
    setObservations(text);
    update(
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
  const [percentage, setPercentage] = useState(iPercentage.toString());

  const handleChange = (value) => {
    if ([" ", ".", ",", "-"].some((e) => value.includes(e))) {
      return;
    }
    if (value === "") {
      update(query, 0, iId);
      setTotal(total - percentage);
      setPercentage("");
      return
    }
    let number = parseInt(value);
    const np = percentage === "" ? 0 : parseInt(percentage);
    if (number > 100 - total + np) {
      number = 100 - total + np;
    }
    setTotal(total - percentage + number);
    setPercentage(number.toString());
    update(query, number, iId);
  };

  return (
    <View style={styles.percentContent}>
      <Pressable onLongPress={() => handleChange((100 - total + parseInt(percentage)).toString())}>
        <Text style={styles.percentTitle}>{tipo}</Text>
      </Pressable>
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

function PlantState({ phenology }) {
  const [total, setTotal] = useState(
    phenology.esteril +
      phenology.brotes +
      phenology.flores +
      phenology.frutosInmaduros +
      phenology.frutosMaduros
  );

  return (
    <Pressable style={styles.content}>
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
