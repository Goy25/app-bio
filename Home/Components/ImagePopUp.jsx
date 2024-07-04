import { useEffect, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import {
  handleNextImage,
  handlePreviousImage,
  handleUpdatePhoto,
  handleAddPhoto,
  handleSelectImage,
} from "../Utils/handler";
import { Entypo } from "@expo/vector-icons";
import theme from "../../General/theme";

export default function ImagePopUp({
  plant,
  photos,
  setPhotos,
  visible,
  setVisible,
}) {
  const db = useSQLiteContext();
  const [index, setIndex] = useState(0);
  const [url, setUrl] = useState(photos[0]);

  useEffect(() => {
    setUrl(photos[index]);
  }, [index, photos]);

  const handlePressImage = () => {
    handleSelectImage((uri) =>
      index !== photos.length - 1
        ? handleUpdatePhoto(db, setUrl, uri)
        : handleAddPhoto(db, uri, plant.id, setPhotos, setIndex)
    );
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable onPress={() => setVisible(false)} style={styles.content}>
        <Pressable onPress={() => handlePressImage()} style={styles.imageField}>
          <Text style={styles.text}>{plant.nombre}</Text>
          <Image source={url} style={styles.image} />
        </Pressable>
        <View style={[theme.row, { justifyContent: "center" }]}>
          <Entypo
            name="arrow-with-circle-left"
            size={40}
            color="white"
            onPress={() => handlePreviousImage(photos.length, setIndex)}
            style={[styles.button, { borderBottomLeftRadius: 16 }]}
          />
          <Entypo
            name="arrow-with-circle-right"
            size={40}
            color="white"
            onPress={() => handleNextImage(photos.length, setIndex)}
            style={[styles.button, { borderBottomRightRadius: 16 }]}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#009658",
    textAlign: "center",
    padding: 5,
    width: 150,
  },
  content: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    height: 300,
    resizeMode: "stretch",
    width: 300,
  },
  imageField: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  text: {
    backgroundColor: "#009658",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
});
