import { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ButtonID from "./ButtonID";
import EditButton from "./EditButton";
import Row from "./Row";
import { DataContext } from "../../General/Context/DataProvider";
import theme from "../../General/theme";
import { handleUpdateName } from "../Utils/handler";

export default function PlantInfo() {
  const { plant } = useContext(DataContext);
  const [collect, setCollect] = useState(plant.colecta);
  const [editable, setEditable] = useState(false);
  const [family, setFamily] = useState(plant.familia);
  const [id, setId] = useState(plant.idB);
  const [name, setName] = useState(plant.nombre);
  const [obs, setObs] = useState(plant.obs);
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View style={theme.row}>
        <EditButton editable={editable} setEditable={setEditable} />
        <TextInput
          editable={editable}
          onChangeText={(text) => handleUpdateName(text, setName, plant)}
          multiline={true}
          style={[theme.title, styles.title]}
          value={name}
        />
        <ButtonID setShow={setShow} />
      </View>
      {show && (
        <>
          <Row
            atribute="familia"
            editable={editable}
            label="Familia"
            value={family}
            setValue={setFamily}
          />
          <Row
            atribute="idB"
            editable={editable}
            label="ID"
            value={id}
            setValue={setId}
          />
          <Row
            atribute="colecta"
            editable={editable}
            label="Colecta"
            value={collect}
            setValue={setCollect}
          />
          <Row
            atribute="obs"
            editable={editable}
            label="Obs"
            value={obs}
            setValue={setObs}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009658",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 2,
    padding: 5,
    width: "100%",
  },
  title: {
    flex: 1,
    fontSize: 16,
    minHeight: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
