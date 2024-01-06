import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DataScreen from "./screens/DataScreen";
import HeaderAdd from "./components/headerAdd";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import SaveToCSV from "./components/saveToCSV";
import Search from "./components/search";
import { Data } from "./utils/context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const query = 'CREATE TABLE IF NOT EXISTS PLANTA (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE,url TEXT DEFAULT"");CREATE TABLE IF NOT EXISTS INDIVIDUO (id INTEGER PRIMARY KEY AUTOINCREMENT,esteril INTEGER DEFAULT 0,brotes INTEGER DEFAULT 0,flores INTEGER DEFAULT 0,frutosInmaduros INTEGER DEFAULT 0,frutosMaduros INTEGER DEFAULT 0,observaciones TEXT DEFAULT "",dia INTEGER);CREATE TABLE IF NOT EXISTS LUGAR (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE);CREATE TABLE IF NOT EXISTS PERIODO (id INTEGER PRIMARY KEY AUTOINCREMENT,dia INTEGER,mes INTEGER,UNIQUE(dia, mes));CREATE TABLE IF NOT EXISTS VISTA (idIndividuo INTEGER,idLugar INTEGER,idPeriodo INTEGER,PRIMARY KEY (idIndividuo, idLugar, idPeriodo),FOREIGN KEY (idIndividuo) REFERENCES INDIVIDUO(id),FOREIGN KEY (idLugar) REFERENCES LUGAR(id),FOREIGN KEY (idPeriodo) REFERENCES PERIODO(id));'

export function StackNavigator() {

  const { exportType } = useContext(Data);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#00C8E0",
        },
      }}
      screenListeners={{
        state: (e) =>
          exportType.setter(e.data.state.index == 0 ? "date" : "plant"),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerRight: SaveToCSV,
          headerLeft: Search,
        }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{
          title: "Información",
          headerRight: SaveToCSV,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {

  const { db } = useContext(Data);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(query, []);
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
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#151E21",
        }}
      >
        <Tab.Screen
          name="Start"
          component={StackNavigator}
          options={{
            headerShown: false,
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Data"
          component={DataScreen}
          options={{
            title: "Datos",
            headerRight: HeaderAdd,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="database" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
