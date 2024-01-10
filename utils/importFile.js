import * as FileSystem from 'expo-file-system';

export async function pickFile() {
  try {
    if (Platform.OS === "android") {
      const permision =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permision.granted) {
        return;
      }
    }
  } catch (error) {
    alert("Error al importar el archivo.")
  }
}