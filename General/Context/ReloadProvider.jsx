import { useState, createContext } from "react";

export const ReloadContext = createContext();

export default function ReloadProvider({ children }) {
  const [reloadPlants, setReloadPlants] = useState(false);
  const [reloadPlaces, setReloadPlaces] = useState(false);

  return (
    <ReloadContext.Provider
      value={{
        reloadPlants,
        setReloadPlants,
        reloadPlaces,
        setReloadPlaces,
      }}
    >
      {children}
    </ReloadContext.Provider>
  );
}