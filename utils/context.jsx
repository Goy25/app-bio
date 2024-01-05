import { useState, createContext } from "react";
import * as SQLite from "expo-sqlite";

export const Data = createContext();
export const Table = createContext();

export function DataProvider({ children }) {

  const db = SQLite.openDatabase("example.db");
  const [plant, setPlant] = useState("");
  const [date, setDate] = useState({ id: 0 });
  const [exportType, setExportType] = useState("date"); // ["date", "plant"]

  return (
    <Data.Provider
      value={{
        db,
        plant: { value: plant, setter: setPlant },
        date: { value: date, setter: setDate },
        exportType: { value: exportType, setter: setExportType },
      }}
    >
      {children}
    </Data.Provider>
  );
}

export function TableProvider({ children }) {

  const [reloadDS, setReloadDS] = useState(false);
  const [reloadDates, setReloadDates] = useState(false);
  const [table, setTable] = useState("PLANTA");

  return (
    <Table.Provider
      value={{
        table,
        setTable,
        reloadDS,
        setReloadDS,
        reloadDates,
        setReloadDates,
      }}
    >
      {children}
    </Table.Provider>
  );
}