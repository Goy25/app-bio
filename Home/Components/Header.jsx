import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import Button from "../../General/Components/Button";
import DateModal from "./DateModal";
import InsertElements from "./InsertElements";
import Picker from "../../General/Components/Picker";
import { DataContext } from "../../General/Context/DataProvider";
import { ReloadContext } from "../../General/Context/ReloadProvider";
import { getPlaces } from "../Utils/database";

export default function Header() {
  const db = useSQLiteContext();
  const { day, month, year, place, setPlace } = useContext(DataContext);
  const { reloadPlaces, setReloadPlaces } = useContext(ReloadContext);
  const navigation = useNavigation();
  const [places, setPlaces] = useState([{ label: "Nuevo Lugar", value: 0 }]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getPlaces(db, setPlaces);
  }, [reloadPlaces]);

  return (
    <>
      <DateModal visible={visible} setVisible={setVisible} />
      <View style={styles.content}>
        <Button
          onPress={() => setVisible(true)}
          text={`${year}-${month}-${day}`}
          style={styles.dateSelect}
          width="42%"
        />
        <Picker
          handleChange={setPlace}
          items={places}
          placeholder="Lugar"
          placeholderValue={-1}
          style={styles.dateSelect}
          value={place}
          width="42%"
        />
        <Foundation
          onPress={() => navigation.navigate("Exportar")}
          style={styles.exportButton}
          name="page-export-csv"
          size={35}
          color="#EDFFF7"
        />
      </View>
      {place === 0 && (
        <InsertElements
          placeholder="Nombre del lugar..."
          query="INSERT INTO LUGAR(nombre) VALUES(?);"
          setReload={setReloadPlaces}
          setShow={setPlace}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    width: "100%",
  },
  dateSelect: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 8,
    borderWidth: 1,
    color: "#151E21",
    fontSize: 14,
    fontWeight: "normal",
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
  exportButton: {
    backgroundColor: "#009658",
    borderRadius: 5,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    width: 40,
  },
});
