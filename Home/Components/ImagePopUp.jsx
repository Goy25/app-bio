import { useEffect, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, TextInput } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import ImageActions from "./ImageActions";
import {
  handleChangeImage,
  handleNextImage,
  handlePreviousImage,
  handleUpdatePhoto,
  handleAddPhoto,
  handleDownloadPhoto,
  handleSelectImage,
} from "../Utils/handler";

export default function ImagePopUp({
  plant,
  photos,
  setPhotos,
  visible,
  setVisible,
}) {
  const db = useSQLiteContext();
  const [name, setName] = useState(plant.nombre);
  const [height, setHeight] = useState(300);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    handleChangeImage(setHeight, index, photos, plant.nombre, setName);
  }, [index, photos]);

  const handlePressImage = () => {
    handleSelectImage((uri) =>
      index !== photos.length - 1
        ? handleUpdatePhoto(db, index, setPhotos, uri)
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
        <TextInput onChangeText={setName} value={name} style={styles.text} />
        <Pressable onPress={() => handlePressImage()} style={styles.imageField}>
          <Image source={photos[index]} style={[styles.image, { height }]} />
        </Pressable>
        <ImageActions
          handleNext={() => handleNextImage(photos.length, setIndex)}
          handleDownload={() => handleDownloadPhoto(photos[index].uri, name)}
          handlePrevious={() => handlePreviousImage(photos.length, setIndex)}
        />
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    resizeMode: "stretch",
    width: 300,
  },
  imageField: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  text: {
    backgroundColor: "#003721",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
    width: 300,
  },
});
