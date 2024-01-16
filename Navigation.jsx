import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ExportScreen from "./screens/ExportScreen";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import Search from "./components/search";
import { createTables } from "./utils/querys";
import { Reload } from "./utils/context";

const Stack = createStackNavigator();

export default function Navigation() {
  const { reloadPlants, reloadPlaces, setReloadPlants, setReloadPlaces } =
    useContext(Reload);
  useEffect(createTables, []);

  const handleFocusHome = () => {
    setReloadPlants(!reloadPlants);
    setReloadPlaces(!reloadPlaces);
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
          name="Info"
          component={InfoScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="Export"
          component={ExportScreen}
          options={{ title: "Exportar/Importar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
