import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text } from "react-native";
import { handleSelectImage } from "../Functions/handler";
import defaultImage from "../../assets/default.png";



export default function ImagePopUp({ plant, visible, setVisible }) {
  const [url, setUrl] = useState(
    plant.url === "" ? defaultImage : {uri: `data:imagejpeg;base64,${plant.url}`}
  );

  return (
    <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
      <Pressable onPress={() => setVisible(false)} style={styles.content}>
        <Pressable onPress={() => handleSelectImage(setUrl)} style={styles.imageField}>
          <Text style={styles.text}>{plant.nombre}</Text>
          <Image source={url} style={styles.image} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

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