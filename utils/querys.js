import * as SQLite from "expo-sqlite";
import {
  allToCSV,
  periodToCSV,
  placeToCSV,
  plantToCSV,
  allToJSON,
  periodToJSON,
  placeToJSON,
  plantToJSON,
} from "./exportFile";

const db = SQLite.openDatabase("example.db");
// Navigations
export function createTables() {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS PLANTA (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE,url TEXT DEFAULT "");',
      []
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS INDIVIDUO (id INTEGER PRIMARY KEY AUTOINCREMENT,esteril INTEGER DEFAULT 0,brotes INTEGER DEFAULT 0,flores INTEGER DEFAULT 0,frutosInmaduros INTEGER DEFAULT 0,frutosMaduros INTEGER DEFAULT 0,observaciones TEXT DEFAULT "",dia INTEGER,idPlanta INTEGER,FOREIGN KEY (idPlanta) REFERENCES PLANTA(id));',
      []
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS LUGAR (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE);",
      []
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS PERIODO (id INTEGER PRIMARY KEY AUTOINCREMENT,anio INTEGER,mes INTEGER,UNIQUE(anio, mes));",
      []
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS VISTA (idIndividuo INTEGER,idLugar INTEGER,idPeriodo INTEGER,PRIMARY KEY (idIndividuo, idLugar, idPeriodo),FOREIGN KEY (idIndividuo) REFERENCES INDIVIDUO(id),FOREIGN KEY (idLugar) REFERENCES LUGAR(id),FOREIGN KEY (idPeriodo) REFERENCES PERIODO(id));",
      []
    );
  });
}
// HomeScreen
export function getPlants(setPlants) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM PLANTA ORDER BY nombre",
      [],
      (_, { rows: { _array } }) => setPlants(_array)
    );
  });
}

export function filterPlants(filter, setPlants) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM PLANTA WHERE nombre LIKE (?) ORDER BY nombre",
      [filter + "%"],
      (_, { rows: { _array } }) => setPlants(_array)
    );
  });
}

export function insertElements(values, query) {
  db.transaction((tx) => {
    values.forEach((value) => {
      tx.executeSql(query, [value.trim()]);
    });
  });
}

export function updateImage(uri, plantId) {
  db.transaction((tx) => {
    tx.executeSql("UPDATE PLANTA SET url = ? WHERE id = ?;", [uri, plantId]);
  });
}
// InfoScreen
export function getPlaces(setPlaces) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM LUGAR ORDER BY nombre",
      [],
      (_, { rows: { _array } }) =>
        setPlaces([
          ..._array.map((row) => ({ label: row.nombre, value: row.id })),
          { label: "Nuevo", value: 0 },
        ])
    );
  });
}

export function getIndividuals(
  plantId,
  day,
  place,
  month,
  year,
  setIndividuals
) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT I.id, I.esteril, I.brotes, I.flores, I.frutosInmaduros, I.frutosMaduros, I.observaciones FROM (SELECT * FROM INDIVIDUO WHERE idPlanta = ? AND dia = ?) I INNER JOIN VISTA V ON V.idIndividuo = I.id and V.idLugar = ? INNER JOIN (SELECT id FROM PERIODO WHERE mes = ? AND anio = ?) P ON P.id = V.idPeriodo;",
      [plantId, day, place, month, year],
      (_, { rows: { _array } }) => setIndividuals(_array)
    );
  });
}

export function insertIndividual(
  year,
  month,
  day,
  plantId,
  place,
  reload,
  setReload
) {
  const insert = (tx, idPeriodo) => {
    tx.executeSql(
      "INSERT INTO INDIVIDUO (dia, idPlanta) VALUES (?, ?)",
      [day, plantId],
      (_, resultI) => {
        tx.executeSql(
          "INSERT INTO VISTA (idIndividuo, idLugar, idPeriodo) VALUES (?, ?, ?)",
          [resultI.insertId, place, idPeriodo],
          () => setReload(!reload)
        );
      }
    );
  };
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM PERIODO WHERE anio = ? AND mes = ?;",
      [year, month],
      (_, { rows }) => {
        if (rows.length > 0) {
          insert(tx, rows._array[0].id);
          return;
        }
        tx.executeSql(
          "INSERT INTO PERIODO (anio, mes) VALUES (?, ?);",
          [year, month],
          (_, result) => insert(tx, result.insertId)
        );
      }
    );
  });
}

export function updatePhenology(query, percentage, id) {
  db.transaction((tx) => {
    tx.executeSql(query, [percentage, id]);
  });
}
//ExportScreen
export function plantItems(setItems) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id,nombre FROM PLANTA ORDER BY nombre;",
      [],
      (_, { rows: { _array } }) =>
        setItems(
          _array.map((plant) => ({ label: plant.nombre, value: plant.id }))
        )
    );
  });
}

export function placeItems(setItems) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id,nombre FROM LUGAR ORDER BY nombre;",
      [],
      (_, { rows: { _array } }) =>
        setItems(
          _array.map((place) => ({ label: place.nombre, value: place.id }))
        )
    );
  });
}

export function periodItems(setItems) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id,anio,mes FROM PERIODO ORDER BY anio DESC,mes DESC;",
      [],
      (_, { rows: { _array } }) =>
        setItems(
          _array.map((period) => ({
            label: `${period.anio}-${`${period.mes}`.padStart(2, 0)}`,
            value: period.id,
          }))
        )
    );
  });
}
// export
export function exportAll(mime) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,X.anio,X.mes,I.dia,L.nombre as lugar,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM PLANTA P JOIN INDIVIDUO I ON P.id=I.idPlanta JOIN VISTA V ON I.id=V.idIndividuo JOIN LUGAR L ON V.idLugar=L.id JOIN PERIODO X ON V.idPeriodo=X.id ORDER BY X.anio DESC,X.mes DESC,I.dia DESC,L.nombre,P.nombre;",
      [],
      (_, { rows: { _array } }) => (mime ? allToCSV(_array) : allToJSON(_array))
    );
  });
}

export function exportPeriod(id, nombre, mime) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,I.dia,L.nombre as lugar,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM VISTA V JOIN LUGAR L ON V.idPeriodo=? AND V.idLugar=L.id JOIN INDIVIDUO I ON I.id=V.idIndividuo JOIN PLANTA P ON P.id=I.idPlanta ORDER BY I.dia DESC,L.nombre,P.nombre;",
      [id],
      (_, { rows: { _array } }) =>
        mime ? periodToCSV(_array, nombre) : periodToJSON(_array, nombre)
    );
  });
}

export function exportPlant(id, nombre, mime) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT I.dia,X.mes,X.anio,L.nombre,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM INDIVIDUO I JOIN VISTA V ON I.idPlanta=? AND I.id=V.idIndividuo JOIN LUGAR L ON V.idLugar=L.id JOIN PERIODO X ON V.idPeriodo=X.id ORDER BY X.anio DESC,X.mes DESC,I.dia DESC,L.nombre;",
      [id],
      (_, { rows: { _array } }) =>
        mime ? plantToCSV(_array, nombre) : plantToJSON(_array, nombre)
    );
  });
}

export function exportPlace(id, nombre, mime) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,I.dia,X.mes,X.anio,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM VISTA V JOIN INDIVIDUO I ON V.idLugar=? AND V.idIndividuo=I.id JOIN PLANTA P ON I.idPlanta=P.id JOIN PERIODO X ON V.idPeriodo=X.id ORDER BY X.anio DESC,X.mes DESC,I.dia DESC,P.nombre;",
      [id],
      (_, { rows: { _array } }) =>
        mime ? placeToCSV(_array, nombre) : placeToJSON(_array, nombre)
    );
  });
}
