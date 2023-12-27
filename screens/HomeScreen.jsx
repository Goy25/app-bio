import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Dates from "../components/dates";
import { Card, AddCard } from "../components/card";

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

export default function HomeScreen( {route} ) {

  const [cards, setCards] = useState([]);
  const { plant, date } = route.params;

  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
      <Dates />
      <ScrollView
        contentContainerStyle={styles.content}
      >
        {cards.map((card, index) => (
          <Card key={index} name={card.name}/>
        ))}
        <AddCard cards={{value: cards, setter: setCards}} />
      </ScrollView>
    </View>
  );
}