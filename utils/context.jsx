import { useState, createContext } from "react";
import * as SQLite from "expo-sqlite";

export const context = createContext();
export const tableContext = createContext();

export function ContextProvider({ children }) {
  const db = SQLite.openDatabase("example.db");
  const [plant, setPlant] = useState("");
  const [date, setDate] = useState("");
  const [table, setTable] = useState("PLANTA");
  const [exportType, setExportType] = useState("date"); // ["date", "plant"]
  const [reloadDS, setReloadDS] = useState(false);

  return (
    <context.Provider
      value={{
        db,
        plant: { value: plant, setter: setPlant },
        date: { value: date, setter: setDate },
        exportType: { value: exportType, setter: setExportType },
      }}
    >
      <tableContext.Provider
        value={{
          table,
          setTable,
          reloadDS,
          setReloadDS,
        }}
      >
        {children}
      </tableContext.Provider>
    </context.Provider>
  );
}
