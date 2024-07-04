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
  const { user_version } = await db.getFirstAsync("PRAGMA user_version");
  console.log(user_version);
  if (user_version >= CURRENT_VERSION) return;
  if (user_version === 0) {
    await createTables(db);
    await db.execAsync("PRAGMA user_version = 1");
  }
  const plant = await db.getFirstAsync("SELECT * FROM PLANTA");
  if (plant.hasOwnProperty('url')) {
    await db.execAsync(`
INSERT INTO FOTO(idPlanta, uri)
SELECT id, 'data:imagejpeg;base64,' || url FROM PLANTA;
      `);
    await db.execAsync("ALTER TABLE PLANTA DROP COLUMN url;");
  }
};
