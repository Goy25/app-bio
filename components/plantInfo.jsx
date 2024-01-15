import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Data } from "../utils/context";
import { update } from "../utils/querys";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    height: 40,
    width: 40,
  },
  buttonText: {
    backgroundColor: "#0ed97f",
    borderRadius: 4,
  },
  container: {
    backgroundColor: "#009658",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 2,
    padding: 5,
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 2,
    color: "black",
    fontWeight: "600",
    padding: 5,
    width: "80%",
  },
  title: {
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

function EditButton({ editable, setEditable }) {
  return (
    <Pressable
      style={[styles.button, editable ? {} : { backgroundColor: "#0ED97F" }]}
      onPress={() => setEditable(!editable)}
    >
      <MaterialIcons name="edit" size={40} color="white" />
    </Pressable>
  );
}

function ButtonID({ show, setShow }) {
  return (
    <Pressable style={styles.button} onPress={() => setShow(!show)}>
      <Text style={[theme.button, styles.buttonText]}>ID</Text>
    </Pressable>
  );
}

function Row({ atribute, editable, id, query, label, value, setValue }) {
  const { plant } = useContext(Data);

  const handleChange = (text) => {
    plant[atribute] = text;
    setValue(text);
    update(query, text, id);
  };

  return (
    <View style={[theme.row, { marginTop: 5 }]}>
      <Text style={theme.label}>{label}</Text>
      <TextInput
        editable={editable}
        onChangeText={handleChange}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

function PlantInfo() {
  const { plant } = useContext(Data);
  const [collect, setCollect] = useState(plant.colecta);
  const [editable, setEditable] = useState(false);
  const [family, setFamily] = useState(plant.familia);
  const [id, setId] = useState(plant.idB);
  const [name, setName] = useState(plant.nombre);
  const [show, setShow] = useState(false);

  const handleChange = (text) => {
    const upper = text.toUpperCase();
    setName(upper);
    if (upper === "") {
      return;
    }
    plant.nombre = upper;
    update("UPDATE PLANTA SET nombre = ? WHERE id = ?", upper, plant.id);
  };

  return (
    <View style={styles.container}>
      <View style={theme.row}>
        <EditButton editable={editable} setEditable={setEditable} />
        <TextInput
          autoCapitalize="characters"
          editable={editable}
          onChangeText={handleChange}
          style={[theme.title, styles.title]}
          value={name}
        />
        <ButtonID show={show} setShow={setShow} />
      </View>
      {show && (
        <>
          <Row
            atribute="familia"
            editable={editable}
            id={plant.id}
            query={"UPDATE PLANTA SET familia = ? WHERE id = ?"}
            label="Familia:"
            value={family}
            setValue={setFamily}
          />
          <Row
            atribute="idB"
            editable={editable}
            id={plant.id}
            query={"UPDATE PLANTA SET idB = ? WHERE id = ?"}
            label="ID: "
            value={id}
            setValue={setId}
          />
          <Row
            atribute="colecta"
            editable={editable}
            id={plant.id}
            query={"UPDATE PLANTA SET colecta = ? WHERE id = ?"}
            label="Colecta:"
            value={collect}
            setValue={setCollect}
          />
        </>
      )}
    </View>
  );
}

export default PlantInfo;
