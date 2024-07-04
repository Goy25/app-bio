import { useState, createContext } from "react";
import { getDay, getMonth, getYear } from "../Utils/getDate";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [day, setDay] = useState(getDay());
  const [month, setMonth] = useState(getMonth());
  const [place, setPlace] = useState(-1);
  const [plant, setPlant] = useState({ id: 0 });
  const [year, setYear] = useState(getYear());

  return (
    <DataContext.Provider
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
    </DataContext.Provider>
  );
}
