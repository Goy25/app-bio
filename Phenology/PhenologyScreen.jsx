import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import PlantInfo from "./Components/PlantInfo";
import PlantState from "./Components/PlantState";
import { DataContext } from "../General/Context/DataProvider";
import { getIndividuals } from "./Utils/database";
import { handleSetOptions } from "./Utils/handler";
import theme from "../General/theme";

const styles = StyleSheet.create({
	container: {
		gap: 10,
		padding: 10,
	},
});

export default function InfoScreen({ navigation }) {
	const db = useSQLiteContext();
	const { day, month, place, plant, year } = useContext(DataContext);
	const [individuals, setIndividuals] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		handleSetOptions(
			db,
			navigation,
			year,
			month,
			day,
			plant.id,
			place,
			setReload,
		);
		getIndividuals(db, plant.id, day, place, month, year, setIndividuals);
	}, [reload]);

	return (
		<View style={[styles.container, theme.container]}>
			<PlantInfo />
			<FlatList
				data={individuals}
				renderItem={({ item }) => <PlantState key={item.id} phenology={item} />}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				contentContainerStyle={theme.scrollContent}
			/>
		</View>
	);
}
