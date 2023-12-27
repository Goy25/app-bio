import { useEffect, useState, createContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import DataScreen from "./screens/DataScreen";
import HeaderAdd from "./components/headerAdd";
import * as SQLite from "expo-sqlite";
import { create } from "./query"

export const Context = createContext();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function StackNavigator() {

  const [plant, setPlant] = useState("");
  const [date, setDate] = useState("");

  return (
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
        initialParams={{ plant: {value: plant, setter: setPlant}, date: {value: date, setter: setDate}}}
        options={{
          title: "Inicio",
        }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        initialParams={{ plant: {value: plant, setter: setPlant}, date: {value: date, setter: setDate}}}
        options={{ 
          title: "Info"
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation () {

  const db = SQLite.openDatabase("example.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        create.planta
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        create.caracteristica
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        create.fecha
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        create.vista
      );
    });
  }, []);

  return (
    <Context.Provider value={db}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: "#151E21",
            headerStyle: {
              backgroundColor: "#00C8E0",
            }
          }}

        >
          <Tab.Screen
            name="Start"
            component={StackNavigator}
            options={{
              headerShown: false,
              title: "Inicio",
            }}
          />
          <Tab.Screen
            name="Data"
            component={DataScreen}
            options={{
              title: "Datos",
              headerRight: () => <HeaderAdd/>,

            }}

          />
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}