import { View, StyleSheet, ScrollView } from "react-native";
import Field, { AddField } from "../components/field";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

export default function DataScreen() {

  const [fields, setFields] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Field />
        <Field />
        {fields.map((field, index) => (
          <Field key={index} name={field.name} text={field.text} />
        ))}
        <AddField fields={{value: fields, setter: setFields}} />
      </ScrollView>
    </View>
  );
}