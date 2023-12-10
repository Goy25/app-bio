import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

export default function HomeScreen() {

  const [cards, setCards] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Card />
        <Card nombre="El nombre tiene mas de una linea"/>
        {cards.map((card, index) => (
          <Card key={index} />
        ))}
        <AddCard card={{value: cards, setter: setCards}} />
      </ScrollView>
    </View>
  );
}