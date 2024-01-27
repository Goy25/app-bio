import { useContext, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Filter } from "../utils/context";

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
  },
  input: {
    borderRadius: 8,
    paddingRight: 5,
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
      <Ionicons
        onPress={() => setSearch(!search)}
        name="search-sharp"
        size={40}
        color="#003721"
      />
      {search && (
        <TextInput
          onChangeText={(text) => setFilter(text)}
          placeholder="Buscar..."
          style={styles.input}
          value={filter}
        />
      )}
    </View>
  );
}

export default Search;
