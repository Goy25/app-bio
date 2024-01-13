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
    alert("Error al crear el archivo.");
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
  const json = {}
  rows.forEach(row => {
    if (!json[row.nombre]) {
      json[row.nombre] = {}
    }
    let act = json[row.nombre]
    const date = new Date(row.anio, row.mes - 1, row.dia)
      .toISOString()
      .slice(0, 10)
    if (!act[date]) {
      act[date] = {}
    }
    act = act[date]
    if (!act[row.lugar]) {
      act[row.lugar] = []
    }
    act = act[row.lugar]
    act.push({
      esteril: row.esteril,
      brotes: row.brotes,
      flores: row.flores,
      frutosInmaduros: row.frutosInmaduros,
      frutosMaduros: row.frutosMaduros,
      observaciones: row.observaciones
    })
  })
  createFile(JSON.stringify(["all", json]), "Todo", "application/json")
}

export function periodToJSON(rows, name) {
  const json = {}
  rows.forEach(row => {
    if (!json[row.nombre]) {
      json[row.nombre] = {}
    }
    let act = json[row.nombre]
    if (!act[row.dia]) {
      act[row.dia] = {}
    }
    act = act[row.dia]
    if (!json[row.lugar]) {
      json[row.lugar] = []
    }
    act = json[row.lugar]
    act.push({
      dia: row.dia,
      esteril: row.esteril,
      brotes: row.brotes,
      flores: row.flores,
      frutosInmaduros: row.frutosInmaduros,
      frutosMaduros: row.frutosMaduros,
      observaciones: row.observaciones
    })
  })
  createFile(JSON.stringify(["period", name, json]), name, "application/json")
}

export function plantToJSON(rows, name) {
  const json = {}
  rows.forEach(row => {
    const date = new Date(row.anio, row.mes - 1, row.dia)
      .toISOString()
      .slice(0, 10)
    if (!json[date]) {
      json[date] = {}
    }
    let act = json[date]
    if (!act[row.nombre]) {
      act[row.nombre] = []
    }
    act = act[row.nombre]
    act.push({
      esteril: row.esteril,
      brotes: row.brotes,
      flores: row.flores,
      frutosInmaduros: row.frutosInmaduros,
      frutosMaduros: row.frutosMaduros,
      observaciones: row.observaciones
    })
  })
  createFile(JSON.stringify(["plant", name, json]), name, "application/json")
}

export function placeToJSON(rows, name) {
  const json = {}
  rows.forEach(row => {
    if (!json[row.nombre]) {
      json[row.nombre] = {}
    }
    let act = json[row.nombre]
    const date = new Date(row.anio, row.mes - 1, row.dia)
      .toISOString()
      .slice(0, 10)
    if (!act[date]) {
      act[date] = []
    }
    act = act[date]
    act.push({
      esteril: row.esteril,
      brotes: row.brotes,
      flores: row.flores,
      frutosInmaduros: row.frutosInmaduros,
      frutosMaduros: row.frutosMaduros,
      observaciones: row.observaciones
    })
  })
  createFile(JSON.stringify(["place", name, json]), name, "application/json")
}