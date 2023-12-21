import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Image } from "react-native";
import Check from "../assets/images/check.png";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  information: {
    display: "flex",
    flexDirection: "column",
    width: "85%"
  },
  name: {

    color: "#00C8E0",
    margin: 0,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 8,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: "100%",
    borderRadius: 8,
    padding: 10,
    borderColor: "#00C8E0",
    borderWidth: 3,
    color: "#151E21",
  },
  editable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: "#00C8E0",
    fontWeight: "bold",
  },
  edit: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 4,
  }
});

export default function Field ( { name = "Nombre", text = {value: "", setter: () => console.log()} } ) {

  const [isEditable, setIsEditable] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Text style={styles.name}>{name}</Text>
        <TextInput style={styles.input} editable={isEditable} multiline={true} />        
      </View>
      <View style={styles.editable}>
        <Text style={styles.editText}>Editar</Text>
        <Pressable style={styles.edit} onPress={() => setIsEditable(!isEditable)}>
          {isEditable && <Image
            source={Check}
          ></Image>}
        </Pressable>
      </View>      
    </View>
  )
}