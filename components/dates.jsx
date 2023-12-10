import { StyleSheet, Text, View, Pressable } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151E21",
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 20,
    padding: 20,
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
});

export default function Dates() {


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
    </View>
  );
}
