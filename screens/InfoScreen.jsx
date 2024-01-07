import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddButton from "../components/addButton";
import Header from "../components/header";
import InsertElements from "../components/insertElements";
import PlantState from "../components/plantState";
import { Data } from "../utils/context";
import { dayList } from "../utils/getDate";
import { getIndividuals, getPlaces, insertIndividual } from "../utils/querys";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    height: "100%",
    gap: 10,
    padding: 10,
  },
  scrollContent: {
    gap: 10,
  },
});

export default function InfoScreen({ navigation }) {
  const { day, setDay, month, place, plant, setPlace, year } = useContext(Data);
  const [days, setDays] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [places, setPlaces] = useState([{ label: "Nuevo", value: 0 }]);
  const [reload, setReload] = useState(false);
  const [reloadP, setReloadP] = useState(false);

  const handleAdd = () => {
    if (!place) {
      alert("Seleccione un lugar");
      return;
    }
    if (!day) {
      alert("Seleccione un dia");
      return;
    }
    insertIndividual(year, month, day, plant.id, place, reload, setReload);
  };

  useEffect(() => {
    setDays(dayList(month, year));
  }, [month, year]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          color="white"
          handlePress={handleAdd}
          size={40}
          style={{ marginRight: 10 }}
        />
      ),
    });
    if (!place) return;
    getIndividuals(plant.id, day, place, month, year, setIndividuals);
  }, [reload, day, place]);

  useEffect(() => getPlaces(setPlaces), [reloadP]);

  return (
    <View style={styles.container}>
      <Header
        firstItems={days}
        firstPlacehoder={"Dia"}
        firstValue={day}
        setFirstValue={setDay}
        secondItems={places}
        secondPlaceholder={"Lugar"}
        secondValue={place}
        setSecondValue={setPlace}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {place === 0 && (
          <InsertElements
            query={"INSERT INTO LUGAR (nombre) VALUES (?) "}
            reload={reloadP}
            setReload={setReloadP}
            setShow={setPlace}
          />
        )}
        {individuals.map((individual) => (
          <PlantState key={individual.id} phenology={individual} />
        ))}
      </ScrollView>
    </View>
  );
}
