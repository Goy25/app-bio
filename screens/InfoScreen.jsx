import { View, StyleSheet, ScrollView } from "react-native";
import Field, { AddField } from "../components/field";
import { useState, useContext, useEffect } from "react";
import { context } from "../utils/context";
import { infoLoad } from "../utils/query";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

export default function InfoScreen( ) {

  const [fields, setFields] = useState([]);
  const { db, plant, date } = useContext(context);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        infoLoad,
        [plant.value.id, date.value.id],
        (_, { rows: { _array } }) => {
          setFields(_array);
        }
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        {fields.map((field, index) => (
          <Field key={index} info={field}/>
        ))}
        <AddField fields={{value: fields, setter: setFields}} />
      </ScrollView>
    </View>
  );
}