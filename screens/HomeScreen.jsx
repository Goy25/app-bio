import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import PlantElement, { NewPlantElement } from "../components/plantElement";
import NewPlant from "../components/newPlant";
import { Data, Filter } from "../utils/context";
import { yearList } from "../utils/getDate";

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
const filterQuery = "SELECT * FROM PLANTA WHERE nombre LIKE (?) ORDER BY nombre"

export default function HomeScreen() {

  const { db, month, setMonth, year, setYear } = useContext(Data);
  const { filter } = useContext(Filter);
  const inputPlant = useRef();
  const [plants, setPlants] = useState([]);
  const [reload, setReload] = useState(false);
  const [showNewField, setShowNewField] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows: { _array } }) => setPlants(_array));
    });
  }, [reload]);

  useEffect(() => {
    if (filter === "") {
      setReload(!reload);
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(filterQuery, [filter+"%"], (_, { rows: { _array } }) => setPlants(_array),);
    });
  }, [filter])

  const handlePress = () => {
    if (inputPlant.current) {
      inputPlant.current.scrollTo({ y: 0, animated: true });
    }
    setShowNewField(true);
  }

  return (
    <View style={styles.container}>
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
