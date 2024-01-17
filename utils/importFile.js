import * as FileSystem from "expo-file-system";
import { importData } from "./querys";

export async function pickFile(setter, setName) {
  try {
    if (Platform.OS === "android") {
      const permision =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permision.granted) {
        return;
      }
      const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
        permision.directoryUri
      );
      setName("");
      setter(
        files
          .filter((file) => file.endsWith(".json"))
          .map((file) => ({
            label: file.split("%2F")[1].replace("%20", " "),
            value: file,
          }))
      );
    }
  } catch (error) {
    alert("Error al importar el archivo.");
  }
}

export async function readFile(uri, setVisibility) {
  const content = await FileSystem.StorageAccessFramework.readAsStringAsync(
    uri
  );
  importData(JSON.parse(content), setVisibility);
}
