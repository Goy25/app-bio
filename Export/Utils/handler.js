import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { filterString } from "../../General/Utils/string";
import { exportAll, exportPeriod, importData } from "./database";

export async function handlePickFile(setter, setName) {
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
          .map((file) => {
            const label = file.split("%2F")[1].replace("%20", " ");
            return {
              label,
              value: file,
              filter: filterString(label),
            };
          })
      );
    }
  } catch (error) {
    alert("Error al importar el archivo.");
  }
}

export const handleReadFile = async (
  db,
  uri,
  setVisibility,
  setText,
  setArc
) => {
  if (uri === "") {
    alert("Seleccione un archivo");
    return;
  }
  const content = await FileSystem.StorageAccessFramework.readAsStringAsync(
    uri
  );
  try {
    setText("Importando...");
    setVisibility(true);
    importData(db, JSON.parse(content), setVisibility, setArc);
  } catch (error) {
    setVisibility(false);
    alert("Error al importar el archivo.");
  }
};

const handleCreateFile = async (content, name, mime, setVisibility) => {
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
};

export const handleExportType = (db, name, period, setVisibility, id, table, csv, setText) => {
  if (name === "") {
    alert("Ingresa un nombre para el archivo");
    return;
  }
  if (table === "all") {
    setText("Exportando...");
    setVisibility(true);
    csv
      ? handleAllToCSV(db, name, setVisibility)
      : handleAllToJSON(db, name, setVisibility);
    return;
  }
  if (id === null) {
    alert("Selecciona un periodo");
    return;
  }
  setVisibility(true);
  csv
    ? handlePeriodToCSV(db, id, name, setVisibility)
    : handlePeriodToJSON(db, id, name, period, setVisibility);
};

export const handleAllToCSV = async (db, name, setVisibility) => {
  const rows = await exportAll(db);
  const arcContent = `Fecha,Lugar,Planta,Familia,ID,Colecta,Obs.,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${new Date(row.anio, row.mes - 1, row.dia)
          .toISOString()
          .slice(0, 10)},${row.lugar},${row.nombre},${
          row.familia === null ? "" : row.familia
        },${row.idB},${row.colecta === null ? "" : row.colecta},${row.obs},${
          row.esteril
        },${row.brotes},${row.flores},${row.frutosInmaduros},${
          row.frutosMaduros
        },${row.observaciones}`
    )
    .join("\n")}`;
  handleCreateFile(arcContent, name, "text/csv", setVisibility);
};

export const handlePeriodToCSV = async (db, id, name, setVisibility) => {
  const rows = await exportPeriod(db, id);
  const arcContent = `Dia,Lugar,Planta,Familia,ID,Colecta,Obs,,Esteril,Brotes Florales,Flores,Frutos Inmaduros,Frutos Maduros,Observaciones\n${rows
    .map(
      (row) =>
        `${row.dia},${row.lugar},${row.nombre},${
          row.familia === null ? "" : row.familia
        },${row.idB},${row.colecta === null ? "" : row.colecta},${row.obs},${
          row.esteril
        },${row.brotes},${row.flores},${row.frutosInmaduros},${
          row.frutosMaduros
        },${row.observaciones}`
    )
    .join("\n")}`;
  handleCreateFile(arcContent, name, "text/csv", setVisibility);
};

export const handleAllToJSON = async (db, name, setVisibility) => {
  const rows = await exportAll(db);
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
        obs: row.obs,
        urls: row.urls.split("|-*-|"),
      };
    }
    if (!json.places[row.lugar]) {
      json.places[row.lugar] = 0;
    }
    if (!json.periods[`${row.anio}-${row.mes}`]) {
      json.periods[`${row.anio}-${row.mes}`] = 0;
    }
  });
  handleCreateFile(
    JSON.stringify(json),
    name,
    "application/json",
    setVisibility
  );
};

export const handlePeriodToJSON = async (db, id, name, period, setVisibility) => {
  const rows = await exportPeriod(db, id);
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
        obs: row.obs,
        urls: row.urls.split("|-*-|"),
      };
    }
    if (!json.places[row.lugar]) {
      json.places[row.lugar] = 0;
    }
    if (!json.periods[`${row.anio}-${row.mes}`]) {
      json.periods[`${row.anio}-${row.mes}`] = 0;
    }
  });
  handleCreateFile(
    JSON.stringify(json),
    name,
    "application/json",
    setVisibility
  );
};
