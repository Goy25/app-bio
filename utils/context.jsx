import { useState, createContext } from "react";
import * as SQLite from "expo-sqlite";

export const context = createContext();
export const tableContext = createContext();

export function ContextProvider({ children }) {
  const db = SQLite.openDatabase("example.db");
  const [table, setTable] = useState("PLANTA");
  return (
    <context.Provider value={db}>
      <tableContext.Provider value={[table, setTable]}>
        {children}
      </tableContext.Provider>
    </context.Provider>
  );
}
