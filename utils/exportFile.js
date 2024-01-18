import * as FileSystem from "expo-file-system";

async function createFile(content, name, mime, setVisibility) {
  try {
    if (Platform.OS === "android") {
      const permision =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permision.granted) {
        setVisibility(false);
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
      setVisibility(false);
    } else {
      const file = `${FileSystem.documentDirectory}${name}`;
      await FileSystem.writeAsStringAsync(file, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setVisibility(false);
    }
  } catch (error) {
    alert("Error al crear el archivo.");
  }
}

export function allToCSV(rows, name, setVisibility) {
  const arcContent = `Fecha,Lugar,Planta,Familia,ID,Colecta,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${new Date(row.anio, row.mes - 1, row.dia)
          .toISOString()
          .slice(0, 10)},${row.lugar},${row.nombre},${
          row.familia === null ? "" : row.familia
        },${row.idB},${row.colecta === null ? "" : row.colecta},${
          row.esteril
        },${row.brotes},${row.flores},${row.frutosInmaduros},${
          row.frutosMaduros
        },${row.observaciones}`
    )
    .join("\n")}`;
  createFile(arcContent, name, "text/csv", setVisibility);
}

export function periodToCSV(rows, name, setVisibility) {
  const arcContent = `Dia,Lugar,Planta,Familia,ID,Colecta,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${row.dia},${row.lugar},${row.nombre},${
          row.familia === null ? "" : row.familia
        },${row.idB},${row.colecta === null ? "" : row.colecta},${
          row.esteril
        },${row.brotes},${row.flores},${row.frutosInmaduros},${
          row.frutosMaduros
        },${row.observaciones}`
    )
    .join("\n")}`;
  createFile(arcContent, name, "text/csv", setVisibility);
}

export function allToJSON(rows, name, setVisibility) {
  const json = {
    plants: {},
    places: {},
    periods: {},
    individuals: rows.map((row) => ({
      plant: row.nombre,
      place: row.lugar,
      period: `${row.anio}-${row.mes}`,
      dia: row.dia,
      esteril: row.esteril,
      brotes: row.brotes,
      flores: row.flores,
      frutosInmaduros: row.frutosInmaduros,
      frutosMaduros: row.frutosMaduros,
      observaciones: row.observaciones,
    })),
  };
  rows.forEach((row) => {
    if (!json.plants[row.nombre]) {
      json.plants[row.nombre] = {
        id: 0,
        familia: row.familia,
        idB: row.idB,
        colecta: row.colecta,
        url: row.url,
      };
    }
    if (!json.places[row.lugar]) {
      json.places[row.lugar] = 0;
    }
    if (!json.periods[`${row.anio}-${row.mes}`]) {
      json.periods[`${row.anio}-${row.mes}`] = 0;
    }
  });
  createFile(JSON.stringify(json), name, "application/json", setVisibility);
}

export function periodToJSON(rows, name, period, setVisibility) {
  const json = {
    plants: {},
    places: {},
    periods: { [period]: 0 },
    individuals: rows.map((row) => ({
      plant: row.nombre,
      place: row.lugar,
      period: period,
      dia: row.dia,
      esteril: row.esteril,
      brotes: row.brotes,
      flores: row.flores,
      frutosInmaduros: row.frutosInmaduros,
      frutosMaduros: row.frutosMaduros,
      observaciones: row.observaciones,
    })),
  };
  rows.forEach((row) => {
    if (!json.plants[row.nombre]) {
      json.plants[row.nombre] = {
        id: 0,
        familia: row.familia,
        idB: row.idB,
        colecta: row.colecta,
        url: row.url,
      };
    }
    if (!json.places[row.lugar]) {
      json.places[row.lugar] = 0;
    }
  });
  createFile(JSON.stringify(json), name, "application/json", setVisibility);
}
