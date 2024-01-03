import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Dates from "../components/dates";
import { Card, AddCard } from "../components/card";
import { context } from "../utils/context";
import { homeLoad } from "../utils/query";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 20,
    padding: 20,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 20,
    paddingVertical: 20,
  },
});

export default function HomeScreen() {
  const [cards, setCards] = useState([]);
  const { db, date } = useContext(context);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(homeLoad, [date.value.id], (_, { rows: { _array } }) =>
        setCards(_array)
      );
    });
  }, [reload, date]);

  return (
    <View style={styles.container}>
      <Dates />
      <ScrollView contentContainerStyle={styles.content}>
        {cards.map((card) => (
          <Card key={card.id} info={card} />
        ))}
        <AddCard reload={{ value: reload, setter: setReload }} />
      </ScrollView>
    </View>
  );
}
