import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import DateModal from "./dateModal";
import InsertElements from "./insertElements";
import Picker from "./picker";
import { Data, Reload } from "../utils/context";
import { getPlaces } from "../utils/querys";

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
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
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

function Header() {
  const { day, month, year, place, setPlace } = useContext(Data);
  const { reloadPlaces, setReloadPlaces } = useContext(Reload);
  const navigation = useNavigation();
  const [places, setPlaces] = useState([{ label: "Nuevo Lugar", value: 0 }]);
  const [visible, setVisible] = useState(false);

  useEffect(() => getPlaces(setPlaces), [reloadPlaces]);

  return (
    <>
      <DateModal visible={visible} setVisible={setVisible} />
      <View style={styles.content}>
        <View style={{ width: "42%" }}>
          <Pressable onPress={() => setVisible(true)}>
            <Text style={styles.dateSelect}>
              {year}-{month}-{day}
            </Text>
          </Pressable>
        </View>
        <View style={{ width: "42%" }}>
          <Picker
            handleChange={setPlace}
            items={places}
            placeholder="Lugar"
            placeholderValue={-1}
            style={styles.dateSelect}
            value={place}
          />
        </View>
        <Foundation
          onPress={() => navigation.navigate("Export")}
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

export default Header;
