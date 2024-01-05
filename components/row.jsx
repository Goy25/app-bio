import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { context, tableContext } from "../utils/context";
import { update } from "../utils/query";

const styles = StyleSheet.create({
  content: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00C8E0",
    padding: 5,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  data: {
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    fontSize: 20,
    borderRadius: 4,
    color: "#151E21",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  checkBox: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function Row({ row }) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(row.data);
  const { table, reloadDates, setReloadDates } = useContext(tableContext);
  const { db } = useContext(context);

  const handleSave = () => {
    db.transaction((tx) => {
      tx.executeSql(update[table], [data, row.id], () =>
        setReloadDates(!reloadDates)
      );
    });
    setEdit(false);
  };

  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <TextInput
          value={data}
          onChangeText={(value) => setData(value)}
          editable={edit}
          style={styles.data}
        />
        <View style={styles.column}>
          <Text style={{color: "white"}}>Editar</Text>
          <Pressable style={styles.checkBox} onPress={() => setEdit(!edit)}>
            {edit && <MaterialCommunityIcons name="check-bold" size={40} color="#00C8E0" />}
          </Pressable>
        </View>
      </View>
      {edit && (
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.textButton}>Guardar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
