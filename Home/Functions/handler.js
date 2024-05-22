import * as ImagePicker from "expo-image-picker";
// import { updateImage } from "../utils/querys";

export const handleSelectImage = async (setUrl) => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Se requiere acceso a la galería");
    return;
  }
  try {
    const picker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (picker.canceled) {
      return;
    }
    setUrl({uri: `data:imagejpeg;base64,${picker.base64}`});
    plant.url = picker.base64;
    // updateImage(picker.base64, plant.id);
  } catch (error) {
    alert("Error al seleccionar la imagen");
  }
};