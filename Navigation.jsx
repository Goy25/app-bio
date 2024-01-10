import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ExportScreen from "./screens/ExportScreen";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import Search from "./components/search";
import { createTables } from "./utils/querys";

const Stack = createStackNavigator();

export default function Navigation() {
  useEffect(createTables, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#063646",
          headerStyle: {
            backgroundColor: "#00C8E0",
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
