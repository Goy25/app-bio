import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import HideHeader from "../components/hideHeader";
import InsertElements from "../components/insertElements";
import PlantElement from "../components/plantElement";
import AddButton from "../components/addButton";
import { Data, Filter, Reload } from "../utils/context";
import { getPlants } from "../utils/querys";
import { filterString } from "../utils/strings";
import theme from "../utils/theme";

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

export default function HomeScreen({ navigation }) {
  const { month, setMonth } = useContext(Data);
  const { reloadPlants, setReloadPlants } = useContext(Reload);
  const { filter } = useContext(Filter);
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

  useEffect(() => getPlants(setPlants), [reloadPlants]);

  useEffect(() => setFilterPlants(plants), [plants]);

  useEffect(() => {
    if (filter === "") {
      setFilterPlants(plants);
      return;
    }
    const filterName = filterString(filter);
    setFilterPlants(plants.filter((plant) => plant.filter.includes(filterName)));
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
          firstItems={[
            { label: "Enero", value: 1 },
            { label: "Febrero", value: 2 },
            { label: "Marzo", value: 3 },
            { label: "Abril", value: 4 },
            { label: "Mayo", value: 5 },
            { label: "Junio", value: 6 },
            { label: "Julio", value: 7 },
            { label: "Agosto", value: 8 },
            { label: "Septiembre", value: 9 },
            { label: "Octubre", value: 10 },
            { label: "Noviembre", value: 11 },
            { label: "Diciembre", value: 12 },
          ]}
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
