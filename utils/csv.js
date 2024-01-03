import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

export const createCSV = async (content, name) => {
  try {
    if (Platform.OS === "android") {
      const permision =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permision.granted) {
        return;
      }
      const file = await FileSystem.StorageAccessFramework.createFileAsync(
        permision.directoryUri,
        name,
        "text/csv"
      );
      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        file,
        content,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
    } else {
      const file = `${FileSystem.documentDirectory}${name}`;
      await FileSystem.writeAsStringAsync(file, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    }
  } catch (error) {
    alert("Error al crear el archivo CSV.");
  }
};

export const generateContent = (data, date) => {
  const labels = new Set();
  const content = {};
  data.forEach((row) => {
    if (!content[row.nombre]) {
      content[row.nombre] = {};
    }
    labels.add(row.tipo);
    content[row.nombre][row.tipo] = row.descripcion || "";
  });
  const temp = Object.keys(content).map((key) => [
    key,
    ...Object.values(content[key]),
  ]);
  return [[date, ...labels], ...temp].join("\n");
};
