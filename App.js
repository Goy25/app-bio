import Navigation from "./Navigation"
import { DataProvider, TableProvider } from "./utils/context"

export default function App () {
  return (
    <DataProvider>
      <TableProvider>
        <Navigation />
      </TableProvider>
    </DataProvider>
  )
}