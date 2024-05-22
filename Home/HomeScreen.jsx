import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddButton from "../General/Components/AddButton";
import Header from "./Components/Header";
import HideHeader from "./Components/HideHeader";
import InsertElements from "../General/Components/InsertElements";
import PlantElement from "./Components/PlantElement";
import { months } from "./Utils/items";
import { DataContext } from "../General/Context/DataProvider";
import { FilterContext } from "../General/Context/FilterProvider";
import { ReloadContext } from "../General/Context/ReloadProvider";
import theme from "../General/theme";

// import { Data, Filter, Reload } from "../utils/context";
// import { getPlants } from "../utils/querys";
// import { filterString } from "../utils/strings";

export default function HomeScreen({ navigation }) {
  const { month, setMonth } = useContext(DataContext);
  const { reloadPlants, setReloadPlants } = useContext(ReloadContext);
  const { filter } = useContext(FilterContext);
  const inputPlant = useRef();
  const [plants, setPlants] = useState([]);
  const [filterPlants, setFilterPlants] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [showNewField, setShowNewField] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HideHeader
          style={{ marginRight: 10 }}
          up={showHeader}
          setUp={setShowHeader}
        />
      ),
    });
  }, [showHeader]);

  // useEffect(() => getPlants(setPlants), [reloadPlants]);

  useEffect(() => setFilterPlants(plants), [plants]);

  useEffect(() => {
    if (filter === "") return;
    const filterName = filterString(filter);
    setFilterPlants(
      plants.filter((plant) => plant.filter.includes(filterName))
    );
  }, [filter]);

  const handlePress = () => {
    if (inputPlant.current) {
      inputPlant.current.scrollTo({ y: 0, animated: true });
    }
    setShowNewField(true);
  };

  return (
    <View style={[styles.container, theme.container]}>
      {showHeader && (
        <Header
          firstItems={months}
          firstPlacehoder={"Mes"}
          firstValue={month}
          setFirstValue={setMonth}
        />
      )}
      <ScrollView contentContainerStyle={theme.scrollContent} ref={inputPlant}>
        {showNewField && (
          <InsertElements
            placeholder="Nombre de la planta..."
            query="INSERT INTO PLANTA (nombre) VALUES (?) "
            reload={reloadPlants}
            setReload={setReloadPlants}
            setShow={setShowNewField}
          />
        )}
        {filterPlants.map((plant) => (
          <PlantElement key={plant.id} plant={plant} />
        ))}
      </ScrollView>
      <AddButton
        color="#009658"
        handlePress={handlePress}
        size={50}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  container: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
});
