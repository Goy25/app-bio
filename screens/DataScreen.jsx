import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import PlantState from "../components/plantState";
import { Data } from "../utils/context";
import { dayList } from "../utils/getDate";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    height: "100%",
    gap: 10,
    padding: 10,
  },
  scrollContent: {
    gap: 10,
  },
});

export default function DataScreen() {

  const { db, day, setDay, month, place, setPlace, year } = useContext(Data);
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(dayList(month, year));
  }, [month, year])

  return (
    <View style={styles.container}>
      <Header
        firstItems={days}
        firstPlacehoder={"Dia"}
        firstValue={day}
        setFirstValue={setDay}
        secondItems={[]}
        secondPlaceholder={"Lugar"}
        secondValue={place}
        setSecondValue={setPlace}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PlantState/>
        <PlantState/>
      </ScrollView>
    </View>
  );
}
