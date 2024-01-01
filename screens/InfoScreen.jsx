import { View, StyleSheet, ScrollView } from "react-native";
import Field, { AddField } from "../components/field";
import FieldModal from "../components/fieldModal";
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

  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState([]);
  const [reloadC, setReloadC] = useState(false);
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
  }, [reloadC]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        {fields.map((field, index) => (
          <Field key={index} info={field}/>
        ))}
      </ScrollView>
      <AddField handlePress={() => setShowModal(true)} />
      <FieldModal visible={{value: showModal, setter: setShowModal}} reload={{value: reloadC, setter: setReloadC}} />
    </View>
  );
}