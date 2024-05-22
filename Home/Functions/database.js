import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("db.db");
// Navigations

export async function getPlants(setPlants) {
  const { rows } = await db.execAsync("SELECT * FROM PLANTA ORDER BY nombre COLLATE UNICODE");
  
}