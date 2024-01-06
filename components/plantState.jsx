import { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { Data } from '../utils/context';

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
    width: "18%",
  },
  percentInput: {
    backgroundColor: "white",
    borderRadius: 4,
    color: "#151E21",
    fontSize: 13,
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

const percents = [
  { label: "10%", value: "10" },
  { label: "20%", value: "20" },
  { label: "30%", value: "30" },
  { label: "40%", value: "40" },
  { label: "50%", value: "50" },
  { label: "60%", value: "60" },
  { label: "70%", value: "70" },
  { label: "80%", value: "80" },
  { label: "90%", value: "90" },
  { label: "100%", value: "100" },
]

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
      <View style={{width: "100%"}}>
        <RNPickerSelect
          items={percents}
          onValueChange={(value) => console.log(value)}
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
        />
      </View>
    </View>
  );
}

function PlantState() {

  const { plant } = useContext(Data);

  return (
    <View style={styles.content}>
      <Text style={styles.tittle}>{plant.nombre} - Fenologia</Text>
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