import { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native"
import SelectTable from "../components/selectTable";
import Row from "../components/row";
import { select } from "../utils/query";
import { useEffect, useState } from "react";
import { context, tableContext } from "../utils/context";

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

  const db = useContext(context);
  const [table, setTable] = useContext(tableContext);
  const [elements, setElements] = useState([]);
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
          <Row row={element} key={element.data} />
        ))}
      </ScrollView>
    </View>
  )
}