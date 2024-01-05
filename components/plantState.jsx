import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    backgroundColor: "#00C8E0",
    borderColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    width: "100%"
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
    width: "18%"
  },
  percentInput: {
    backgroundColor: "white",
    borderRadius: 4,
    color: "#151E21",
    padding: 1,
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
    borderBottomColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },
});

function Observations() {
  return (
    <View style={styles.observationContent}>
      <Text style={styles.observationText}>Observaciones: </Text>
      <TextInput style={styles.observationInput}/>
    </View>
  );
}

function Percent({ tipo }) {
  return (
    <View style={styles.percentContent}>
      <Text  style={styles.percentTitle}>{tipo}</Text>
      <TextInput placeholder='%' style={styles.percentInput} keyboardType='numeric' />
    </View>
  );
}

function PlantState() {
  return (
    <View style={styles.content}>
      <Text style={styles.tittle}> - Fenologia</Text>
      <View style={styles.percentsContainer}>
        <Percent tipo={"Esteril"}/>
        <Percent tipo={"Brotes Florales"}/>
        <Percent tipo={"Flores"}/>
        <Percent tipo={"Frutos Inmaduros"}/>
        <Percent tipo={"Frutos Maduros"}/>
      </View>
      <Observations/>
    </View>
  );
}

export default PlantState;