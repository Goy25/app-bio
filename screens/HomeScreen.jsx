import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import HideHeader from "../components/hideHeader";
import InsertElements from "../components/insertElements";
import PlantElement from "../components/plantElement";
import AddButton from "../components/addButton";
import { Data, Filter } from "../utils/context";
import { yearList } from "../utils/getDate";
import { filterPlants, getPlants } from "../utils/querys";

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 10,
    padding: 10,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 10,
  },
});

export default function HomeScreen({ navigation }) {
  const { month, setMonth, year, setYear } = useContext(Data);
  const { filter } = useContext(Filter);
  const inputPlant = useRef();
  const [plants, setPlants] = useState([]);
  const [reload, setReload] = useState(false);
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

  useEffect(() => getPlants(setPlants), [reload]);

  useEffect(() => {
    if (filter === "") {
      setReload(!reload);
      return;
    }
    filterPlants(filter, setPlants);
  }, [filter]);

  const handlePress = () => {
    if (inputPlant.current) {
      inputPlant.current.scrollTo({ y: 0, animated: true });
    }
    setShowNewField(true);
  };

  return (
    <View style={styles.container}>
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
          secondItems={yearList()}
          secondPlaceholder={"Año"}
          secondValue={year}
          setSecondValue={setYear}
        />
      )}
      <ScrollView contentContainerStyle={styles.content} ref={inputPlant}>
        {showNewField && (
          <InsertElements
            query="INSERT INTO PLANTA (nombre) VALUES (?) "
            reload={reload}
            setReload={setReload}
            setShow={setShowNewField}
          />
        )}
        {plants.map((plant) => (
          <PlantElement key={plant.id} plant={plant} />
        ))}
      </ScrollView>
      <AddButton
        color="#00C8E0"
        handlePress={handlePress}
        size={50}
        style={styles.addButton}
      />
    </View>
  );
}
