import { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import DataScreen from "./screens/DataScreen";
import HeaderAdd from "./components/headerAdd";
import { create } from "./utils/query"
import { context } from "./utils/context"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function StackNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
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
        name="Info"
        component={InfoScreen}
        options={{ 
          title: "Información"
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation () {

  const { db } = useContext(context);

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
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#00C8E0",
          },
          tabBarStyle: {
            backgroundColor: "#00C8E0",
          },
          tabBarLabelStyle: {
            color: "#FFFFFF",
          },
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
  );
}