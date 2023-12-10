import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import defaultImage from '../assets/images/default.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151E21',
    borderRadius: 10,
    borderColor: '#00C8E0',
    borderWidth: 1,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  information: {
    flexGrow: 1,
    gap: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00C8E0',
    width: 140,
    textAlign: "center",
  },
  button: {
    backgroundColor: '#00C8E0',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default function Card( {nombre = "Planta"} ) {

  const [url, setUrl] = useState(defaultImage);

  const selectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (! permission.granted) {
      alert("Se requiere acceso a la galería");
      return;
    }
    const picker = await ImagePicker.launchImageLibraryAsync();
    console.log(picker);
    if (picker.canceled) {
      return;
    }
    setUrl({uri: picker.assets[0].uri});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nombre}</Text>
      <Pressable onPress={selectImage}>
        <Image
          source={url}
          style={styles.image}
        />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.textButton}>Ver más</Text>
      </Pressable>
    </View>
  )
}