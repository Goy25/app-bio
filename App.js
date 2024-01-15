import Navigation from "./Navigation"
import { DataProvider, FilterProvider, ReloadProvider } from "./utils/context"

export default function App () {
  return (
    <DataProvider>
      <ReloadProvider>
        <FilterProvider>
          <Navigation />
        </FilterProvider>
      </ReloadProvider>
    </DataProvider>
  )
}