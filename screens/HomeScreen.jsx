import React, { useContext, useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Date from "../components/date";
import PlantElement, { NewPlantElement } from "../components/plantElement";
import NewPlant from "../components/newPlant";
import { context } from "../utils/context";

const styles = StyleSheet.create({
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

const query = "SELECT * FROM PLANTA ORDER BY nombre";

export default function HomeScreen() {

  const { db, date } = useContext(context);
  const inputPlant = useRef();
  const [plants, setPlants] = useState([]);
  const [reload, setReload] = useState(false);
  const [showNewField, setShowNewField] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows: { _array } }) => setPlants(_array));
    });
  }, [reload, date]);

  const handlePress = () => {
    if (inputPlant.current) {
      inputPlant.current.scrollTo({ y: 0, animated: true });
    }
    setShowNewField(true);
  }

  return (
    <View style={styles.container}>
      <Date />
      <ScrollView contentContainerStyle={styles.content} ref={inputPlant}>
        {showNewField && (
          <NewPlantElement
            reload={reload}
            setReload={setReload}
            setShow={setShowNewField}
          />
        )}
        {plants.map((plant) => (
          <PlantElement key={plant.id} plant={plant} />
        ))}
      </ScrollView>
      <NewPlant handlePress={handlePress} reference={inputPlant}/>
    </View>
  );
}
