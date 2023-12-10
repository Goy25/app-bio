import { useState } from "react";
import Card from "./card";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 20,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  dates: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    backgroundColor: "#00C8E0",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flexGrow: 1,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00C8E0",
  },
  right: {
    backgroundColor: "#00C8E0",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 20,
    paddingVertical: 20,
  },
  addCard: {
    backgroundColor: "#00C8E0",
    borderRadius: 10,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusSign: {
    backgroundColor: "#151E21",
    height: 100,
    width: 100,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textPlusSign: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#00C8E0",
    lineHeight: 110,
    includeFontPadding: false,
  },
});

export default function Dates() {

  const [cards, setCards] = useState([]);

  const addCard = () => {
    setCards([...cards, {}]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.dates}>
        <Pressable style={styles.left}>
          <Text style={styles.text}>{"<"}</Text>
        </Pressable>
        <Pressable style={styles.center}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Fecha
          </Text>
        </Pressable>
        <Pressable style={styles.right}>
          <Text style={styles.text}>{">"}</Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Card />
        <Card nombre="El nombre tiene mas de una linea"/>
        {cards.map((card, index) => (
          <Card key={index} />
        ))}
        <Pressable style={styles.addCard} onPress={addCard}>
          <View style={styles.plusSign}>
            <Text style={styles.textPlusSign}>+</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}
