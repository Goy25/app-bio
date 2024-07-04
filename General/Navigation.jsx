import { useContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ExportScreen from "../Export/ExportScreen";
import HomeScreen from "../Home/HomeScreen";
import PhenologyScreen from "../Phenology/PhenologyScreen";
import Search from "./Components/Search";
import { ReloadContext } from "./Context/ReloadProvider";

const Stack = createStackNavigator();

export default function Navigation() {
  const { setReloadPlants, setReloadPlaces } = useContext(ReloadContext);
  const db = useSQLiteContext();

  const handleFocusHome = () => {
    setReloadPlants((reloadPlants) => !reloadPlants);
    setReloadPlaces((reloadPlaces) => !reloadPlaces);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#003721",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Inicio",
            headerLeft: Search,
          }}
          listeners={{ focus: handleFocusHome }}
        />
        <Stack.Screen
          name="Fenologia"
          component={PhenologyScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="Exportar"
          component={ExportScreen}
          options={{ title: "Exportar/Importar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
