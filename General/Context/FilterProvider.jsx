import { useState, createContext } from "react";

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        search,
        setSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}