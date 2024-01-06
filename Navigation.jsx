import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import Search from "./components/search";
import { Data } from "./utils/context";

const Stack = createStackNavigator();
const query = {
  PLANTA: 'CREATE TABLE IF NOT EXISTS PLANTA (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE,url TEXT DEFAULT "");',
  INDIVIDUO: 'CREATE TABLE IF NOT EXISTS INDIVIDUO (id INTEGER PRIMARY KEY AUTOINCREMENT,esteril INTEGER DEFAULT 0,brotes INTEGER DEFAULT 0,flores INTEGER DEFAULT 0,frutosInmaduros INTEGER DEFAULT 0,frutosMaduros INTEGER DEFAULT 0,observaciones TEXT DEFAULT "",dia INTEGER,idPlanta INTEGER,FOREIGN KEY (idPlanta) REFERENCES PLANTA(id));',
  LUGAR: 'CREATE TABLE IF NOT EXISTS LUGAR (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE);',
  PERIODO: 'CREATE TABLE IF NOT EXISTS PERIODO (id INTEGER PRIMARY KEY AUTOINCREMENT,anio INTEGER,mes INTEGER,UNIQUE(anio, mes));',
  VISTA: 'CREATE TABLE IF NOT EXISTS VISTA (idIndividuo INTEGER,idLugar INTEGER,idPeriodo INTEGER,PRIMARY KEY (idIndividuo, idLugar, idPeriodo),FOREIGN KEY (idIndividuo) REFERENCES INDIVIDUO(id),FOREIGN KEY (idLugar) REFERENCES LUGAR(id),FOREIGN KEY (idPeriodo) REFERENCES PERIODO(id));',
}

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
          headerLeft: Search,
        }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {

  const { db } = useContext(Data);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(query.PLANTA, []);
      tx.executeSql(query.INDIVIDUO, []);
      tx.executeSql(query.LUGAR, []);
      tx.executeSql(query.PERIODO, []);
      tx.executeSql(query.VISTA, []);
    });
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
