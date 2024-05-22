import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddButton from "../General/Components/AddButton";
import PlantInfo from "./Components/PlantInfo";
import PlantState from "./Components/PlantState";
import { DataContext } from "../General/Context/DataProvider";
// import { getIndividuals, insertIndividual } from "../utils/querys";
import theme from "../General/theme";

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});

export default function InfoScreen({ navigation }) {
  const { day, month, place, plant, year } = useContext(DataContext);
  const [individuals, setIndividuals] = useState([]);
  const [reload, setReload] = useState(false);

  const handleAdd = () => {
    // insertIndividual(year, month, day, plant.id, place, reload, setReload);
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
    setOptions();
    // getIndividuals(plant.id, day, place, month, year, setIndividuals);
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
