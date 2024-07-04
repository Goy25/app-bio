import { Pressable, StyleSheet, View } from "react-native";
import Observations from "./Observations";
import Percent from "./Percent";
import TotalProvider from "../Utils/TotalContext";

export default function PlantState({ phenology }) {

  return (
    <Pressable style={styles.content}>
      <View style={styles.percentsContainer}>
        <TotalProvider phenology={phenology}>
          <Percent
            iId={phenology.id}
            iPercentage={phenology.esteril}
            tipo={"Esteril"}
            atribute="esteril"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.brotes}
            tipo={"Brotes Florales"}
            phenology={phenology}
            atribute="brotes"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.flores}
            tipo="Flores"
            atribute="flores"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.frutosInmaduros}
            tipo="Frutos Inmaduros"
            atribute="frutosInmaduros"
          />
          <Percent
            iId={phenology.id}
            iPercentage={phenology.frutosMaduros}
            tipo="Frutos Maduros"
            atribute="frutosMaduros"
          />
        </TotalProvider>
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