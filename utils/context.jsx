import { useState, createContext } from "react";
import { getDay, getMonth, getYear } from "./getDate";

export const Data = createContext();
export const Table = createContext();
export const Filter = createContext();

export function DataProvider({ children }) {

  const [day, setDay] = useState(getDay());
  const [month, setMonth] = useState(getMonth());
  const [place, setPlace] = useState(-1);
  const [plant, setPlant] = useState({id: 0});
  const [year, setYear] = useState(getYear());

  return (
    <Data.Provider
      value={{
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