import { useState, createContext } from "react";
import { getDay, getMonth, getYear } from "./getDate";

export const Data = createContext();
export const Filter = createContext();
export const Reload = createContext();

export function DataProvider({ children }) {
  const [day, setDay] = useState(getDay());
  const [month, setMonth] = useState(getMonth());
  const [place, setPlace] = useState(-1);
  const [plant, setPlant] = useState({ id: 0 });
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
        setSearch,
      }}
    >
      {children}
    </Filter.Provider>
  );
}

export function ReloadProvider({ children }) {
  const [reloadPlants, setReloadPlants] = useState(false);
  const [reloadPlaces, setReloadPlaces] = useState(false);

  return (
    <Reload.Provider
      value={{
        reloadPlants,
        setReloadPlants,
        reloadPlaces,
        setReloadPlaces,
      }}
    >
      {children}
    </Reload.Provider>
  );
}
