import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddButton from "../components/addButton";
import Header from "../components/header";
import InsertElements from "../components/insertElements";
import PlantState from "../components/plantState";
import { Data } from "../utils/context";
import { dayList } from "../utils/getDate";

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
  const { db, day, setDay, month, place, plant, setPlace, year } =
    useContext(Data);
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
    const insert = (tx, idPeriodo) => {
      tx.executeSql(
        "INSERT INTO INDIVIDUO (dia, idPlanta) VALUES (?, ?)",
        [day, plant.id],
        (_, resultI) => {
          tx.executeSql(
            "INSERT INTO VISTA (idIndividuo, idLugar, idPeriodo) VALUES (?, ?, ?)",
            [resultI.insertId, place, idPeriodo],
            () => setReload(!reload)
          );
        }
      );
    };
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PERIODO WHERE anio = ? AND mes = ?;",
        [year, month],
        (_, { rows }) => {
          if (rows.length > 0) {
            insert(tx, rows._array[0].id);
            return;
          }
          tx.executeSql(
            "INSERT INTO PERIODO (anio, mes) VALUES (?, ?);",
            [year, month],
            (_, result) => insert(tx, result.insertId)
          );
        }
      );
    });
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
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT I.id, I.esteril, I.brotes, I.flores, I.frutosInmaduros, I.frutosMaduros, I.observaciones FROM (SELECT * FROM INDIVIDUO WHERE idPlanta = ? AND dia = ?) I INNER JOIN VISTA V ON V.idIndividuo = I.id and V.idLugar = ? INNER JOIN (SELECT id FROM PERIODO WHERE mes = ? AND anio = ?) P ON P.id = V.idPeriodo;",
        [plant.id, day, place, month, year],
        (_, { rows: { _array } }) => setIndividuals(_array),
        (_, error) => console.log(error)
      );
    });
  }, [reload, day, place]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM LUGAR ORDER BY nombre",
        [],
        (_, { rows: { _array } }) =>
          setPlaces([
            ..._array.map((row) => ({ label: row.nombre, value: row.id })),
            { label: "Nuevo", value: 0 },
          ]),
        (_, error) => console.log(error)
      );
    });
  }, [reloadP]);

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
