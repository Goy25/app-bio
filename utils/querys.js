import * as SQLite from "expo-sqlite";
import { allToCSV, periodToCSV, allToJSON, periodToJSON } from "./exportFile";
import { capitalize, filterString } from "./strings";

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
      `CREATE TABLE IF NOT EXISTS PLANTA (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) UNIQUE,
        familia TEXT DEFAULT '',
        idB TEXT DEFAULT '',
        colecta TEXT DEFAULT '',
        obs TEXT DEFAULT ''
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS FOTO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        idPlanta INTEGER,
        FOREIGN KEY (idPlanta) REFERENCES PLANTA(id)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS LUGAR (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) UNIQUE
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS PERIODO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anio INTEGER,
        mes INTEGER,
        UNIQUE(anio, mes)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS INDIVIDUO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        esteril INTEGER DEFAULT 0,
        brotes INTEGER DEFAULT 0,
        flores INTEGER DEFAULT 0,
        frutosInmaduros INTEGER DEFAULT 0,
        frutosMaduros INTEGER DEFAULT 0,
        observaciones TEXT DEFAULT '',
        dia INTEGER,
        idPlanta INTEGER,
        FOREIGN KEY (idPlanta) REFERENCES PLANTA(id)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS VISTA (
        idIndividuo INTEGER,
        idLugar INTEGER,
        idPeriodo INTEGER,
        PRIMARY KEY (idIndividuo, idLugar, idPeriodo),
        FOREIGN KEY (idIndividuo) REFERENCES INDIVIDUO(id),
        FOREIGN KEY (idLugar) REFERENCES LUGAR(id),
        FOREIGN KEY (idPeriodo) REFERENCES PERIODO(id)
      );`
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
          ..._array.map((row) => ({
            label: row.nombre,
            value: row.id,
            filter: filterString(row.nombre),
          })),
          { label: "Nuevo Lugar", value: 0, filter: "nuevo lugar" },
        ])
    );
  });
}

export function getPlants(setPlants) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM PLANTA ORDER BY nombre COLLATE UNICODE",
      [],
      (_, { rows: { _array } }) =>
        setPlants(
          _array.map((row) => ({ ...row, filter: filterString(row.nombre) }))
        )
    );
  });
}

export function insertElements(values, query) {
  db.transaction((tx) => {
    values.forEach((value) => {
      tx.executeSql(query, [capitalize(value.trim())]);
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
          () => setReload((prev) => !prev)
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
      "SELECT id, anio,mes FROM PERIODO ORDER BY anio DESC, mes DESC;",
      [],
      (_, { rows: { _array } }) =>
        setItems(
          _array.map((period) => {
            const date = `${period.anio}-${`${period.mes}`.padStart(2, 0)}`;
            return {
              label: date,
              value: period.id,
              filter: date,
            };
          })
        )
    );
  });
}
// export
export function exportAll(nombre, mime, setVisibility) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,P.familia,P.idB,P.colecta,P.obs,P.url,X.anio,X.mes,I.dia,L.nombre as lugar,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM PLANTA P JOIN INDIVIDUO I ON P.id=I.idPlanta JOIN VISTA V ON I.id=V.idIndividuo JOIN LUGAR L ON V.idLugar=L.id JOIN PERIODO X ON V.idPeriodo=X.id ORDER BY X.anio DESC,X.mes DESC,I.dia DESC,L.nombre,P.nombre;",
      [],
      (_, { rows: { _array } }) =>
        mime
          ? allToCSV(_array, nombre, setVisibility)
          : allToJSON(_array, nombre, setVisibility)
    );
  });
}

export function exportPeriod(id, nombre, period, mime, setVisibility) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT P.nombre,P.familia,P.idB,P.colecta,P.obs,P.url,I.dia,L.nombre as lugar,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones FROM VISTA V JOIN LUGAR L ON V.idPeriodo=? AND V.idLugar=L.id JOIN INDIVIDUO I ON I.id=V.idIndividuo JOIN PLANTA P ON P.id=I.idPlanta ORDER BY I.dia DESC,L.nombre,P.nombre;",
      [id],
      (_, { rows: { _array } }) =>
        mime
          ? periodToCSV(_array, nombre, setVisibility)
          : periodToJSON(_array, nombre, period, setVisibility)
    );
  });
}
// import
function importIndividuals(data, setVisibility) {
  db.transaction(
    (tx) => {
      data.individuals.forEach((ind) => {
        tx.executeSql(
          "INSERT INTO INDIVIDUO (dia,idPlanta,esteril,brotes,flores,frutosInmaduros,frutosMaduros,observaciones) VALUES (?,?,?,?,?,?,?,?);",
          [
            ind.dia,
            data.plants[ind.plant].id,
            ind.esteril,
            ind.brotes,
            ind.flores,
            ind.frutosInmaduros,
            ind.frutosMaduros,
            ind.observaciones,
          ],
          (_, { insertId }) => {
            tx.executeSql(
              "INSERT INTO VISTA (idIndividuo,idLugar,idPeriodo) VALUES (?,?,?);",
              [insertId, data.places[ind.place], data.periods[ind.period]]
            );
          }
        );
      });
    },
    () => {
      setVisibility(false);
      alert("Error al importar los individuos");
    },
    () => setVisibility(false)
  );
}

function importPeriods(data, setVisibility) {
  db.transaction(
    (tx) => {
      for (const period in data.periods) {
        const [year, month] = period.split("-").map((x) => parseInt(x));
        tx.executeSql(
          "SELECT * FROM PERIODO WHERE anio = ? AND mes = ?;",
          [year, month],
          (_, { rows }) => {
            if (rows.length > 0) {
              data.periods[period] = rows._array[0].id;
              return;
            }
            tx.executeSql(
              "INSERT INTO PERIODO (anio,mes) VALUES (?,?);",
              [year, month],
              (_, { insertId }) => {
                data.periods[period] = insertId;
              }
            );
          }
        );
      }
    },
    () => {
      setVisibility(false);
      alert("Error al importar periodo.");
    },
    () => importIndividuals(data, setVisibility)
  );
}

function importPlaces(data, setVisibility) {
  db.transaction(
    (tx) => {
      for (const place in data.places) {
        tx.executeSql(
          "SELECT * FROM LUGAR WHERE nombre = ?;",
          [place],
          (_, { rows }) => {
            if (rows.length > 0) {
              data.places[place] = rows._array[0].id;
              return;
            }
            tx.executeSql(
              "INSERT INTO LUGAR (nombre) VALUES (?);",
              [place],
              (_, { insertId }) => {
                data.places[place] = insertId;
              }
            );
          }
        );
      }
    },
    () => {
      setVisibility(false);
      alert("Error al importar lugares.");
    },
    () => importPeriods(data, setVisibility)
  );
}

export function importData(data, setVisibility, setArc) {
  db.transaction(
    (tx) => {
      for (const [plant, info] of Object.entries(data.plants)) {
        tx.executeSql(
          "SELECT * FROM PLANTA WHERE nombre = ?;",
          [plant],
          (_, { rows }) => {
            if (rows.length > 0) {
              data.plants[plant].id = rows._array[0].id;
              if (rows._array[0].url === "" && info.url !== "") {
                updateImage(info.url, rows._array[0].id);
              }
              return;
            }
            tx.executeSql(
              "INSERT INTO PLANTA (nombre,familia,idB,colecta,obs,url) VALUES (?,?,?,?,?,?);",
              [plant, info.familia, info.idB, info.colecta, info.obs, info.url],
              (_, { insertId }) => {
                data.plants[plant].id = insertId;
              }
            );
          }
        );
      }
    },
    () => {
      setVisibility(false);
      alert("Error al importar plantas.");
    },
    () => {
      importPlaces(data, setVisibility);
      setArc("");
    }
  );
}
