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
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  flexColumnCenter: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  select: {
    backgroundColor: "white",
    borderColor: "#003721",
    borderRadius: 4,
    borderWidth: 2,
    color: "#151E21",
    fontSize: 14,
    fontWeight: "normal",
    height: 40,
    paddingHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "center",
    width: 150,
  },
  scrollContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default theme;
