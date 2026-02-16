import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import AddButton from "../General/Components/AddButton";
import Header from "./Components/Header";
import InsertElements from "./Components/InsertElements";
import PlantElement from "./Components/PlantElement";
import { months } from "./Utils/items";
import { DataContext } from "../General/Context/DataProvider";
import { FilterContext } from "../General/Context/FilterProvider";
import { ReloadContext } from "../General/Context/ReloadProvider";
import theme from "../General/theme";
import { getPlants } from "./Utils/database";
import {
	handleAddPlant,
	handleFilterPlant,
	handleUpdateHeader,
} from "./Utils/handler";

export default function HomeScreen({ navigation }) {
	const db = useSQLiteContext();
	const { month, setMonth } = useContext(DataContext);
	const { reloadPlants, setReloadPlants } = useContext(ReloadContext);
	const { filter } = useContext(FilterContext);
	const inputPlant = useRef();
	const [plants, setPlants] = useState([]);
	const [filterPlants, setFilterPlants] = useState([]);
	const [showHeader, setShowHeader] = useState(true);
	const [showNewField, setShowNewField] = useState(false);

	useEffect(() => {
		handleUpdateHeader(navigation, showHeader, setShowHeader);
	}, [showHeader]);

	useEffect(() => {
		getPlants(db, setPlants);
	}, [reloadPlants]);

	useEffect(() => {
		setFilterPlants(plants);
	}, [plants]);

	useEffect(() => {
		handleFilterPlant(filter, setFilterPlants, plants);
	}, [filter]);

	return (
		<View style={[styles.container, theme.container]}>
			{showHeader && (
				<Header
					firstItems={months}
					firstPlacehoder="Mes"
					firstValue={month}
					setFirstValue={setMonth}
				/>
			)}
			<FlatList
				data={filterPlants}
				renderItem={({ item }) => <PlantElement plant={item} />}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={theme.scrollContent}
				ref={inputPlant}
				ListHeaderComponent={
					showNewField && (
						<InsertElements
							placeholder="Nombre de la planta..."
							query="INSERT INTO PLANTA (nombre) VALUES (?)"
							setReload={setReloadPlants}
							setShow={setShowNewField}
						/>
					)
				}
				persistentScrollbar={true}
			/>
			<AddButton
				color="#009658"
				handlePress={() => handleAddPlant(inputPlant, setShowNewField)}
				size={50}
				style={styles.addButton}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
	},
	container: {
		display: "flex",
		gap: 10,
		padding: 10,
	},
});
