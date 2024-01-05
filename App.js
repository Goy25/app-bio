import Navigation from "./Navigation"
import { DataProvider, FilterProvider, TableProvider } from "./utils/context"

export default function App () {
  return (
    <DataProvider>
      <TableProvider>
        <FilterProvider>
          <Navigation />
        </FilterProvider>
      </TableProvider>
    </DataProvider>
  )
}