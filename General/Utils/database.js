export async function createTables(db) {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS PLANTA (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(100) UNIQUE,
      familia TEXT DEFAULT '',
      idB TEXT DEFAULT '',
      colecta TEXT DEFAULT '',
      obs TEXT DEFAULT ''
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS FOTO (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uri TEXT,
      idPlanta INTEGER,
      FOREIGN KEY (idPlanta) REFERENCES PLANTA(id)
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS LUGAR (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(100) UNIQUE
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS PERIODO (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      anio INTEGER,
      mes INTEGER,
      UNIQUE(anio, mes)
    );`
  );
  await db.execAsync(
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
  await db.execAsync(
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
}

export const update = async (db, table, atribute, content, id) => {
  await db.runAsync(`UPDATE ${table} SET ${atribute} = ? WHERE id = ?;`, [content, id]);
};