import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { filterString } from "../Functions/string";


function ChooseItem({ handleChange, items, placeholder, show, setShow }) {
  const [filter, setFilter] = useState("");
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (show) {
      setElements(items);
      setFilter("");
    }
  }, [show]);

  const handleChangeText = (text) => {
    const filtered = filterString(text);
    setElements(items.filter((e) => e.filter.includes(filtered)));
    setFilter(text);
  };

  return (
    <Modal
      onRequestClose={() => setShow(false)}
      transparent={true}
      visible={show}
    >
      <Pressable onPress={() => setShow(false)} style={styles.container}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={35} color="#00153A" />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="Buscar"
            style={styles.search}
            value={filter}
          />
        </View>
        <ScrollView contentContainerStyle={styles.items}>
          
          <Button bgColor="white" {...placeholder} style={styles.item} textColor="black"/>
          {elements.map((item, index) => (
            <Button
              bgColor="white"
              key={item.value}
              text={item.label}
              textColor="black"
              onPress={() => {
                handleChange(item.value, index+1);
                setShow(false);
              }}
              style={styles.item}
            />
          ))}
        </ScrollView>
      </Pressable>
    </Modal>
  );
}

export default function Picker({
  handleChange,
  items,
  placeholder = "Seleccionar",
  placeholderValue = 0,
  style,
  value,
}) {
  const [label, setLabel] = useState(placeholder);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    const selectedItem = items.find((item) => item.value === value);
    if (selectedItem !== undefined) {
      setLabel(selectedItem.label);
    } else {
      handleChange(placeholderValue);
      setLabel(placeholder);
    }
  }, [items, value]);

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <Text style={style}>{label}</Text>
      </Pressable>
      <ChooseItem
        handleChange={handleChange}
        items={items}
        placeholder={{
          text: placeholder,
          onPress: () => {
            handleChange(placeholderValue);
            setShow(false);
          },
        }}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    height: "100%",
    paddingHorizontal: "10%",
    paddingVertical: "20%",
    width: "100%",
  },
  item: {
    fontSize: 16,
    fontWeight: "bold",
    minHeight: 50,
    justifyContent: "center",
    paddingHorizontal: "5%",
    paddingVertical: 5,
    textAlign: "left",
    textAlignVertical: "center",
    width: "100%",
  },
  items: {
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    width: "100%",
  },
  label: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  search: {
    color: "#00153A",
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    backgroundColor: "white",
    borderColor: "#00153A",
    borderRadius: 8,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});