import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Field from "../components/field";
import FieldModal from "../components/fieldModal";
import InfoButtons from "../components/infoButtons";
import { Data } from "../utils/context";
import { infoLoad, update } from "../utils/query";

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

export default function InfoScreen() {

  const { db, plant, date } = useContext(Data);
  const [fields, setFields] = useState([]);
  const [reloadC, setReloadC] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleSave = () => {
    fields.forEach((field) => {
      db.transaction((tx) => {
        tx.executeSql(update.VISTA, [
          field.descripcion,
          plant.value.id,
          field.id,
          date.value.id,
        ]);
      });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {fields.map((field, index) => (
          <Field key={index} info={field} />
        ))}
      </ScrollView>
      <InfoButtons
        handleAdd={() => setShowModal(true)}
        handleSave={handleSave}
      />
      <FieldModal
        visible={{ value: showModal, setter: setShowModal }}
        reload={{ value: reloadC, setter: setReloadC }}
      />
    </View>
  );
}
