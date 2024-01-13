import { StyleSheet } from "react-native";

const theme = StyleSheet.create({
  button: {
    backgroundColor: "#009658",
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
  container: {
    backgroundColor: "#EDFFF7",
    height: "100%",
    width: "100%",
  },
  scrollContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 10
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default theme;