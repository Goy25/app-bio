import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import DataScreen from "./screens/DataScreen";

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#151E21",
          headerStyle: {
            backgroundColor: "#00C8E0"
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: "Inicio",
          }}
        />
        <Stack.Screen
          name="Data"
          component={DataScreen}
          options={{ 
            title: "Datos"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}