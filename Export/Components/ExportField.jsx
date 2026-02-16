import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Button from "../../General/Components/Button";
import Select from "./Select";
import { getPeriods } from "../Utils/database";
import { handleExportType } from "../Utils/handler";
import theme from "../../General/theme";

export default function ExportField({ setVisible, setText }) {
	const db = useSQLiteContext();
	const [id, setId] = useState(null);
	const [index, setIndex] = useState(0);
	const [csv, setCSV] = useState(true);
	const [items, setItems] = useState([]);
	const [table, setTable] = useState("all");
	const [title, setTitle] = useState("Todo");
	const [exportPhotos, setExportPhotos] = useState(false);

	const handleChangeTable = (value) => {
		setTable(value);
		setId(null);
	};

	const handleChangeItem = (value, i) => {
		setId(value);
		if (i > 0) {
			setTitle(items[i - 1].label);
			setIndex(i - 1);
		}
	};

	useEffect(() => {
		getPeriods(db, setItems);
	}, []);

	useEffect(() => {
		setTitle(table === "all" ? "Todo" : "");
	}, [table]);

	return (
		<View style={styles.content}>
			<Text style={theme.title}>Exportar</Text>
			<Select
				label="Exportar a:"
				items={[
					{
						label: "Otro Dispositivo",
						value: false,
						filter: "otro dispositivo",
					},
				]}
				handleChange={setCSV}
				placeholder={{ label: "Excel", value: true }}
				style={{ color: "#151E21" }}
				value={csv}
			/>
			<Select
				label="Exportar"
				items={[{ label: "por Periodo", value: "time", filter: "por periodo" }]}
				handleChange={handleChangeTable}
				placeholder={{ label: "Todo", value: "all" }}
				value={table}
			/>
			{table != "all" && (
				<Select
					label="Periodo:"
					items={items}
					handleChange={handleChangeItem}
					placeholder={{ label: "Seleccionar", value: null }}
					value={id}
				/>
			)}
			<View style={theme.row}>
				<Text style={theme.label}>Nombre Archivo:</Text>
				<TextInput onChangeText={setTitle} style={theme.select} value={title} />
			</View>

			{!csv && (
				<View style={theme.row}>
					<Text style={theme.label}>Exportar Fotos:</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={exportPhotos ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={setExportPhotos}
						value={exportPhotos}
					/>
				</View>
			)}

			<Button
				text="Exportar"
				onPress={() =>
					handleExportType(
						db,
						title,
						items[index].label,
						setVisible,
						id,
						table,
						csv,
						setText,
						exportPhotos,
					)
				}
				bgColor="#0ed97f"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#009658",
		borderColor: "#003721",
		borderRadius: 8,
		borderWidth: 2,
		gap: 20,
		padding: 20,
		width: "100%",
	},
});
