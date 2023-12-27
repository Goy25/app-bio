import { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native"
import SelectTable from "../components/selectTable";
import Row from "../components/row";
import { select } from "../query";
import { useEffect, useState } from "react";
import { Context } from "../Navigation";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    height: "100%",
    padding: 20,
    gap: 10,
  },
  scrollContent: {
    gap: 10,
  },
});

export default function DataScreen () {

  const db = useContext(Context);
  const [table, setTable] = useState("PLANTA");
  const [elements, setElements] = useState([{id: 1, data: "data1"}, {id: 2, data: "data2"}, {id: 3, data: "data3"}, {id: 4, data: "data4"}, {id: 5, data: "data5"}, {id: 6, data: "data6"}, {id: 7, data: "data7"}, {id: 8, data: "data8"}, {id: 9, data: "data9"}, {id: 10, data: "data10"}]);
  const atribute = {
    PLANTA: "nombre",
    CARACTERISTICA: "tipo",
    FECHA: "fecha",
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        select[table],
        [],
        (_, { rows: { _array } }) => setElements(_array.map((element) => ({id: element.id, data: element[atribute[table]]})))
      );
    });
  }, [table])

  return (
    <View style={styles.container}>
      <SelectTable 
        table={{value: table, setter: setTable}}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {elements.map((element) => (
          <Row row={element} key={element.id} />
        ))}
      </ScrollView>
    </View>
  )
}