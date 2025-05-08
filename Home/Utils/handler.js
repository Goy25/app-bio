import { Dimensions, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import HideHeader from "../Components/HideHeader";
import { update } from "../../General/Utils/database";
import { filterString } from "../../General/Utils/string";

export const handleNextImage = (length, setIndex) => {
  setIndex((prev) => (prev + 1) % length);
};

export const handlePreviousImage = (length, setIndex) => {
  setIndex((prev) => {
    if (prev === 0) return length - 1;
    return prev - 1;
  });
};

export const handleUpdatePhoto = (db, index, setPhotos, uri) => {
  setPhotos((prev) => {
    let photos = [...prev];
    photos[index] = { ...prev[index], uri };
    update(db, "FOTO", "uri", uri, prev[index].id);
    return photos;
  });
};

export const handleAddPhoto = async (
  db,
  uri,
  idPlanta,
  setPhotos,
  setIndex
) => {
  const res = await db.runAsync(
    "INSERT INTO FOTO (uri, idPlanta) VALUES (?, ?)",
    [uri, idPlanta]
  );
  setPhotos((prev) => [{ id: res.lastInsertRowId, uri, idPlanta }, ...prev]);
  setIndex(0);
};

export const handleDownloadPhoto = async (uri, name) => {
  try {
    if (Platform.OS === "android") {
      const permision =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permision.granted) return;
      const path = await FileSystem.StorageAccessFramework.createFileAsync(
        permision.directoryUri,
        name,
        "image/jpeg"
      );
      const base64Data = uri.replace("data:imagejpeg;base64,", "");
      await FileSystem.writeAsStringAsync(path, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
  } catch (error) {
    alert("Error al descargar la imagen");
  }
};

export const handleChangeImage = (setHeight, index, photos, name, setName) => {
  if (index + 1 === photos.length) {
    setHeight(300);
    setName(name);
    return;
  }
  setName(`${name}_${index + 1}`);
  const maxHeight = Dimensions.get('window').height - 150;
  Image.getSize(photos[index].uri, (width, height) => {
    const proportionalHeight = (300 / width) * height;
    setHeight(proportionalHeight <= maxHeight ? proportionalHeight : maxHeight);
  });
}

export const handleSelectImage = async (imageHandler) => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Se requiere acceso a la galería");
    return;
  }
  try {
    const picker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      base64: true,
    });
    if (picker.canceled) {
      return;
    }
    imageHandler(`data:imagejpeg;base64,${picker.assets[0].base64}`);
  } catch (error) {
    alert("Error al seleccionar la imagen");
  }
};

export const handleAddPlant = (scrollView, setShow) => {
  if (scrollView.current) {
    scrollView.current.scrollTo({ y: 0, animated: true });
  }
  setShow(true);
};

export const handleFilterPlant = (filter, setFilterPlants, plants) => {
  if (filter === "") setFilterPlants(plants);
  const filterName = filterString(filter);
  setFilterPlants(plants.filter((plant) => plant.filter.includes(filterName)));
};

export const handleUpdateHeader = (navigation, showHeader, setShowHeader) => {
  navigation.setOptions({
    headerRight: () => (
      <HideHeader
        style={{ marginRight: 10 }}
        up={showHeader}
        setUp={setShowHeader}
      />
    ),
  });
};

export const handleSelectPlant = (
  place,
  plant,
  setPlant,
  setSearch,
  navigation,
  name
) => {
  if (place < 1) {
    alert("Seleccione un lugar");
    return;
  }
  setPlant(plant);
  setSearch(false);
  navigation.navigate("Fenologia", { name });
};
