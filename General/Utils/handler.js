import { filterString } from "./string";
import { createTables } from "./database";

export const handleSelectFilter = (text, items, setElements, setFilter) => {
  const filtered = filterString(text);
  setElements(items.filter((e) => e.filter.includes(filtered)));
  setFilter(text);
};

export const handleShowElements = (show, items, setElements, setFilter) => {
  if (!show) return;
  setElements(items);
  setFilter("");
};

export const handleMigrateDB = async (db) => {
  const CURRENT_VERSION = 2;
  let { user_version: currentDbVersion } = await db.getFirstAsync(
    "PRAGMA user_version"
  );
  if (currentDbVersion >= CURRENT_VERSION) return;
  if (currentDbVersion === 0) {
    await createTables(db);
    await db.execAsync("PRAGMA user_version = 1");
    currentDbVersion = 1;
  }
  if (currentDbVersion === 1) {
    const plant = await db.getFirstAsync("SELECT * FROM PLANTA;");
    if (plant && plant.hasOwnProperty("url")) {
      await db.execAsync("ALTER TABLE PLANTA RENAME TO PLANTA_TEMP;");
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
        `INSERT INTO PLANTA (nombre, familia, idB, colecta, obs)
          SELECT nombre, familia, idB, colecta, obs FROM PLANTA_TEMP;`
      );
      await db.execAsync(
        `INSERT INTO FOTO (idPlanta, uri)
          SELECT id, 'data:imagejpeg;base64,' || url FROM PLANTA_TEMP
          WHERE COALESCE(url, '') != '' ;`
      );
      await db.execAsync("DROP TABLE PLANTA_TEMP;");
    }
    await db.execAsync("PRAGMA user_version = 2");
    currentDbVersion = 2;
  }
};
