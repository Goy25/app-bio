import { useState, createContext } from "react";
import * as SQLite from "expo-sqlite";
import { getDay, getMonth, getYear } from "./getDate";

export const Data = createContext();
export const Table = createContext();
export const Filter = createContext();

export function DataProvider({ children }) {

  const db = SQLite.openDatabase("example.db");
  const [day, setDay] = useState(getDay());
  const [month, setMonth] = useState(getMonth());
  const [place, setPlace] = useState("");
  const [plant, setPlant] = useState("");
  const [year, setYear] = useState(getYear());
  const [exportType, setExportType] = useState("date"); // ["date", "plant"]

  return (
    <Data.Provider
      value={{
        db,
        day,
        setDay,
        month,
        setMonth,
        place,
        setPlace,
        year,
        setYear,
        plant,
        setPlant,
        exportType: { value: exportType, setter: setExportType },
      }}
    >
      {children}
    </Data.Provider>
  );
}

export function FilterProvider({ children }) {

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(false);

  return (
    <Filter.Provider
      value={{
        filter,
        setFilter,
        search,
        setSearch
      }}
    >
      {children}
    </Filter.Provider>
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