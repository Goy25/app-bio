// import Navigation from "./Navigation"
// import { DataProvider, FilterProvider, ReloadProvider } from "./utils/context"

// export default function App () {
//   return (
//     <DataProvider>
//       <ReloadProvider>
//         <FilterProvider>
//           <Navigation />
//         </FilterProvider>
//       </ReloadProvider>
//     </DataProvider>
//   )
// }
import DataProvider from "./General/Context/DataProvider";
import FilterProvider from "./General/Context/FilterProvider";
import ReloadProvider from "./General/Context/ReloadProvider";
import Navigation from "./General/Navigation";

export default function App() {
  return (
    <DataProvider>
      <ReloadProvider>
        <FilterProvider>
          <Navigation />
        </FilterProvider>
      </ReloadProvider>
    </DataProvider>
  );
}
