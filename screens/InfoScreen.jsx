import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddButton from "../components/addButton";
import PlantInfo from "../components/plantInfo";
import PlantState from "../components/plantState";
import { Data, Reload } from "../utils/context";
import { getIndividuals, insertIndividual } from "../utils/querys";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});

export default function InfoScreen({ navigation }) {
  const { day, month, place, plant, year } = useContext(Data);
  const { reloadPlants, setReloadPlants } = useContext(Reload);
  const [individuals, setIndividuals] = useState([]);
  const [reload, setReload] = useState(false);

  const handleAdd = () => {
    insertIndividual(year, month, day, plant.id, place, reload, setReload);
  };

  const setOptions = () => {
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
  };

  useEffect(() => {
    return setReloadPlants(!reloadPlants);
  }, []);

  useEffect(() => {
    setOptions();
    getIndividuals(plant.id, day, place, month, year, setIndividuals);
  }, [reload]);

  return (
    <View style={[styles.container, theme.container]}>
      <PlantInfo />
      <ScrollView contentContainerStyle={theme.scrollContent}>
        {individuals.map((individual) => (
          <PlantState key={individual.id} phenology={individual} />
        ))}
      </ScrollView>
    </View>
  );
}
