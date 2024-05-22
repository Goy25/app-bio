import { createContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Observations from "./Observations";
import Percent from "./Percent";
// import { update } from "../utils/querys";

const TotalContext = createContext();

export default function PlantState({ phenology }) {
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
        <TotalContext.Provider value={{ total, setTotal }}>
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
        </TotalContext.Provider>
      </View>
      <Observations
        iId={phenology.id}
        iObservations={phenology.observaciones}
      />
    </Pressable>
  );
}

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
  percentsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
    width: "100%",
  },
});