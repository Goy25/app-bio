import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import Search from "./components/search";
import { Data } from "./utils/context";

const Stack = createStackNavigator();

export default function Navigation() {
  const { db } = useContext(Data);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS PLANTA (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE,url TEXT DEFAULT "");',
        []
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS INDIVIDUO (id INTEGER PRIMARY KEY AUTOINCREMENT,esteril INTEGER DEFAULT 0,brotes INTEGER DEFAULT 0,flores INTEGER DEFAULT 0,frutosInmaduros INTEGER DEFAULT 0,frutosMaduros INTEGER DEFAULT 0,observaciones TEXT DEFAULT "",dia INTEGER,idPlanta INTEGER,FOREIGN KEY (idPlanta) REFERENCES PLANTA(id));',
        []
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS LUGAR (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE);",
        []
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS PERIODO (id INTEGER PRIMARY KEY AUTOINCREMENT,anio INTEGER,mes INTEGER,UNIQUE(anio, mes));",
        []
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS VISTA (idIndividuo INTEGER,idLugar INTEGER,idPeriodo INTEGER,PRIMARY KEY (idIndividuo, idLugar, idPeriodo),FOREIGN KEY (idIndividuo) REFERENCES INDIVIDUO(id),FOREIGN KEY (idLugar) REFERENCES LUGAR(id),FOREIGN KEY (idPeriodo) REFERENCES PERIODO(id));",
        []
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#00C8E0",
          },
        }}
        // screenListeners={{
        //   state: (e) =>
        //     exportType.setter(e.data.state.index == 0 ? "date" : "plant"),
        // }}
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
    </NavigationContainer>
  );
}
