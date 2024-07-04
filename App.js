import { SQLiteProvider } from "expo-sqlite";
import DataProvider from "./General/Context/DataProvider";
import FilterProvider from "./General/Context/FilterProvider";
import ReloadProvider from "./General/Context/ReloadProvider";
import Navigation from "./General/Navigation";
import { handleMigrateDB } from "./General/Utils/handler";

export default function App() {
  return (
    <SQLiteProvider databaseName="test.db" onInit={handleMigrateDB}>
      <DataProvider>
        <ReloadProvider>
          <FilterProvider>
            <Navigation />
          </FilterProvider>
        </ReloadProvider>
      </DataProvider>
    </SQLiteProvider>
  );
}
