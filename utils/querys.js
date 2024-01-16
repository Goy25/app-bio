import * as SQLite from "expo-sqlite";
import { allToCSV, periodToCSV, allToJSON, periodToJSON } from "./exportFile";

const db = SQLite.openDatabase("db.db");
// Navigations
export function createTables() {
  db.transaction((tx) => {
    // tx.executeSql("DROP TABLE IF EXISTS PLANTA;", []);
    // tx.executeSql("DROP TABLE IF EXISTS INDIVIDUO;", []);
    // tx.executeSql("DROP TABLE IF EXISTS LUGAR;", []);
    // tx.executeSql("DROP TABLE IF EXISTS PERIODO;", []);
    // tx.executeSql("DROP TABLE IF EXISTS VISTA;", []);
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS PLANTA (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE,url TEXT DEFAULT "",familia TEXT DEFAULT "",idB TEXT DEFAULT "",colecta TEXT DEFAULT "");',
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
export function getPlaces(setPlaces) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM LUGAR ORDER BY nombre",
      [],
      (_, { rows: { _array } }) =>
        setPlaces([
          ..._array.map((row) => ({ label: row.nombre, value: row.id })),
          { label: "Nuevo Lugar", value: 0 },
        ])
    );
  });
}

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
      [`%${filter}%`],
      (_, { rows: { _array } }) => setPlants(_array)
    );
  });
}

export function insertElements(values, query) {
  db.transaction((tx) => {
    values.forEach((value) => {
      tx.executeSql(query, [value.trim().toUpperCase()]);
    });
  });
}

export function updateImage(uri, plantId) {
  db.transaction((tx) => {
    tx.executeSql("UPDATE PLANTA SET url = ? WHERE id = ?;", [uri, plantId]);
  });
}
// InfoScreen

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

export function update(query, content, id) {
  db.transaction((tx) => {
    tx.executeSql(query, [content, id]);
  });
}

//ExportScreen
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
export function exportAll(nombre, mime) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,P.familia,P.idB,P.colecta,X.anio,X.mes,I.dia,L.nombre as lugar,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM PLANTA P JOIN INDIVIDUO I ON P.id=I.idPlanta JOIN VISTA V ON I.id=V.idIndividuo JOIN LUGAR L ON V.idLugar=L.id JOIN PERIODO X ON V.idPeriodo=X.id ORDER BY X.anio DESC,X.mes DESC,I.dia DESC,L.nombre,P.nombre;",
      [],
      (_, { rows: { _array } }) =>
        mime ? allToCSV(_array, nombre) : allToJSON(_array, nombre)
    );
  });
}

export function exportPeriod(id, nombre, period, mime) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,P.familia,P.idB,P.colecta,I.dia,L.nombre as lugar,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM VISTA V JOIN LUGAR L ON V.idPeriodo=? AND V.idLugar=L.id JOIN INDIVIDUO I ON I.id=V.idIndividuo JOIN PLANTA P ON P.id=I.idPlanta ORDER BY I.dia DESC,L.nombre,P.nombre;",
      [id],
      (_, { rows: { _array } }) =>
        mime
          ? periodToCSV(_array, nombre)
          : periodToJSON(_array, nombre, period)
    );
  });
}

function finalPartImport(idPlant, idPeriod, content) {
  const placesId = {};

  const insertInd = (tx, idPlant, idPeriod, idPlace, content) => {
    for (const [k, v] of Object.entries(content)) {
      v.forEach((ind) => {
        tx.executeSql(
          "INSERT INTO INDIVIDUO (esteril, brotes, flores, frutosInmaduros, frutosMaduros, observaciones, dia, idPlanta) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [
            ind.esteril,
            ind.brotes,
            ind.flores,
            ind.frutosInmaduros,
            ind.frutosMaduros,
            ind.observaciones,
            parseInt(k),
            idPlant,
          ],
          (_, { insertId }) => {
            tx.executeSql(
              "INSERT INTO VISTA (idIndividuo, idLugar, idPeriodo) VALUES (?, ?, ?);",
              [insertId, idPlace, idPeriod]
            );
          },
        );
      });
    }
  };

  db.transaction((tx) => {
    for (const [k, v] of Object.entries(content)) {
      if (k === "caracteristicas") continue;
      if (placesId[k]) {
        insertInd(tx, idPlant, idPeriod, placesId[k], v);
        return;
      }
      tx.executeSql(
        "SELECT id FROM LUGAR WHERE nombre = ?;",
        [k],
        (_, { rows }) => {
          if (rows.length > 0) {
            placesId[k] = rows._array[0].id;
            insertInd(tx, idPlant, idPeriod, rows._array[0].id, v);
            return;
          }
          tx.executeSql(
            "INSERT INTO LUGAR (nombre) VALUES (?);",
            [k],
            (_, { insertId }) => {
              placesId[k] = insertId;
              insertInd(tx, idPlant, idPeriod, insertId, v);
            },
          );
        },
      );
    }
  });
}

export function importAll(
  content,
  setReloadPlants,
  setReloadPlaces,
  reloadPlants,
  reloadPlaces,
  setVisibility
) {
  const periodsId = {};

  const insertPeriod = (idPlant, content) => {
    db.transaction((tx) => {
      for (const [k, v] of Object.entries(content)) {
        if (k === "caracteristicas") continue;
        if (periodsId[k]) {
          finalPartImport(idPlant, periodsId[k], v);
          return;
        }
        const period = k.split("-");
        tx.executeSql(
          "SELECT id FROM PERIODO WHERE anio = ? AND mes = ?;",
          [parseInt(period[0]), parseInt(period[1])],
          (_, { rows }) => {
            if (rows.length > 0) {
              periodsId[k] = rows._array[0].id;
              finalPartImport(idPlant, rows._array[0].id, v);
              return;
            }
            tx.executeSql(
              "INSERT INTO PERIODO (anio, mes) VALUES (?, ?);",
              [parseInt(period[0]), parseInt(period[1])],
              (_, { insertId }) => {
                periodsId[k] = insertId;
                finalPartImport(idPlant, insertId, v);
              },
            );
          },
        );
      }
    });
  };

  db.transaction(
    (tx) => {
      for (const [k, v] of Object.entries(content)) {
        tx.executeSql(
          "SELECT id FROM PLANTA WHERE nombre = ?;",
          [k],
          (_, { rows }) => {
            if (rows.length > 0) {
              insertPeriod(rows._array[0].id, v);
              return;
            }
            tx.executeSql(
              "INSERT INTO PLANTA (nombre, familia, idB, colecta) VALUES (?, ?, ?, ?);",
              [
                k,
                v.caracteristicas[0],
                v.caracteristicas[1],
                v.caracteristicas[2],
              ],
              (_, { insertId }) => insertPeriod(insertId, v),
            );
          },
        );
      }
    },
    () => {
      alert("Error al importar.");
      setVisibility(false);
    },
    () => {
      setReloadPlants(!reloadPlants);
      setReloadPlaces(!reloadPlaces);
      setVisibility(false);
    }
  );
}

export function importPeriod(
  period,
  content,
  setReloadPlants,
  setReloadPlaces,
  reloadPlants,
  reloadPlaces,
  setVisibility
) {
  const insertPlant = (tx, id, content) => {
    for (const [k, v] of Object.entries(content)) {
      tx.executeSql(
        "SELECT id FROM PLANTA WHERE nombre = ?;",
        [k],
        (_, { rows }) => {
          if (rows.length > 0) {
            finalPartImport(rows._array[0].id, id, v);
            return;
          }
          tx.executeSql(
            "INSERT INTO PLANTA (nombre, familia, idB, colecta) VALUES (?, ?, ?, ?);",
            [
              k,
              v.caracteristicas[0],
              v.caracteristicas[1],
              v.caracteristicas[2],
            ],
            (_, { insertId }) => finalPartImport(insertId, id, v)
          );
        }
      );
    }
  };

  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT id FROM PERIODO WHERE anio = ? AND mes = ?;",
        [parseInt(period[0]), parseInt(period[1])],
        (_, { rows }) => {
          if (rows.length > 0) {
            console.log("existe period");
            insertPlant(tx, rows._array[0].id, content);
            return;
          }
          tx.executeSql(
            "INSERT INTO PERIODO (anio, mes) VALUES (?, ?);",
            [parseInt(period[0]), parseInt(period[1])],
            (_, { insertId }) => insertPlant(tx, insertId, content)
          );
        }
      );
    },
    () => {
      alert("Error al importar el periodo.");
      setVisibility(false);
    },
    () => {
      setReloadPlants(!reloadPlants);
      setReloadPlaces(!reloadPlaces);
      setVisibility(false);
    }
  );
}
