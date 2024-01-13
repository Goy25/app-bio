import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import defaultImage from "../assets/default.png";
import { updateImage } from "../utils/querys";

const styles = StyleSheet.create({
  content: {
    height: "100%",
    width: "100%",
  },
  image: {
    width: 300,
    height: 300,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    resizeMode: "stretch",
  },
  imageField: {
    backgroundColor: "white",
    borderRadius: 16,
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: [{ translateX: -150 }, { translateY: -150 }],
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

function ImagePopUp({ plant, visible, setVisible }) {
  const [url, setUrl] = useState(
    plant.url === "" ? defaultImage : { uri: plant.url }
  );

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Se requiere acceso a la galería");
      return;
    }
    const picker = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images})
    if (picker.canceled) {
      return;
    }
    setUrl({ uri: picker.assets[0].uri });
    plant.url = picker.assets[0].uri;
    updateImage(picker.assets[0].uri, plant.id);
  };

  return (
    <Modal transparent={true} visible={visible}>
      <Pressable onPress={() => setVisible(false)} style={styles.content}>
        <Pressable onPress={handleSelectImage} style={styles.imageField}>
          <Text style={styles.text}>{plant.nombre}</Text>
          <Image source={url} style={styles.image} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default ImagePopUp;
