import { useContext, useEffect } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Filter } from "../utils/context";

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "80%",
  },
});

function Search() {
  const { filter, setFilter, search, setSearch } = useContext(Filter);

  useEffect(() => {
    if (!search) {
      setFilter("");
    }
  }, [search]);

  return (
    <View style={styles.content}>
      <Pressable onPress={() => setSearch(!search)}>
        <Ionicons name="search-circle" size={40} color="white" />
      </Pressable>
      {search && (
        <TextInput
          onChangeText={(text) => setFilter(text)}
          style={styles.input}
          value={filter}
        />
      )}
    </View>
  );
}

export default Search;
