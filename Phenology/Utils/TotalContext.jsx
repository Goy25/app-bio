import { createContext, useState } from "react";

export const TotalContext = createContext();

export default function TotalProvider({ children, phenology }) {
  const [total, setTotal] = useState(
    phenology.esteril +
      phenology.brotes +
      phenology.flores +
      phenology.frutosInmaduros +
      phenology.frutosMaduros
  );

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
}