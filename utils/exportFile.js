import * as FileSystem from "expo-file-system";

async function createFile(content, name, mime) {
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
        mime
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
}

export function allToCSV(rows) {
  const arcContent = `Fecha,Lugar,Planta,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${new Date(row.anio, row.mes - 1, row.dia)
          .toISOString()
          .slice(0, 10)},${row.lugar},${row.nombre},${row.esteril},${
          row.brotes
        },${row.flores},${row.frutosInmaduros},${row.frutosMaduros},${
          row.observaciones
        }`
    )
    .join("\n")}`;
  createFile(arcContent, "Todo", "text/csv");
}

export function periodToCSV(rows, name) {
  const arcContent = `Dia,Lugar,Planta,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
      `${row.dia},${row.lugar},${row.nombre},${row.esteril},${row.brotes},${row.flores},${row.frutosInmaduros},${row.frutosMaduros},${row.observaciones}`
    )
    .join("\n")}`;
  createFile(arcContent, name, "text/csv");
}

export function plantToCSV(rows, name) {
  const arcContent = `Fecha,Lugar,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${new Date(row.anio, row.mes - 1, row.dia)
          .toISOString()
          .slice(0, 10)},${row.nombre},${row.esteril},${
          row.brotes
        },${row.flores},${row.frutosInmaduros},${row.frutosMaduros},${
          row.observaciones
        }`
    )
    .join("\n")}`;
  createFile(arcContent, name, "text/csv");
}

export function placeToCSV(rows, name) {
  const arcContent = `Fecha,Planta,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${new Date(row.anio, row.mes - 1, row.dia)
          .toISOString()
          .slice(0, 10)},${row.nombre},${row.esteril},${
          row.brotes
        },${row.flores},${row.frutosInmaduros},${row.frutosMaduros},${
          row.observaciones
        }`
    )
    .join("\n")}`;
  createFile(arcContent, name, "text/csv");
}


export function allToJSON(rows) {

}

export function periodToJSON(rows, name) {

}

export function plantToJSON(rows, name) {

}

export function placeToJSON(rows, name) {

}