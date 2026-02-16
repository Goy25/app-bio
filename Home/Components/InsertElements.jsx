import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Button from "../../General/Components/Button";
import { insertElements } from "../Utils/database";

export default function InsertElements({
	placeholder = "Nombre...",
	query,
	setReload,
	setShow,
}) {
	const db = useSQLiteContext();
	const [toInsert, setToInsert] = useState("");

	const handleSave = async () => {
		if (toInsert === "") {
			return;
		}
		const values = toInsert.split("\n").filter((value) => value !== "");
		await insertElements(db, values, query);
		setReload((prev) => !prev);
		setShow(false);
	};

	return (
		<View style={styles.header}>
			<View style={styles.content}>
				<TextInput
					onChangeText={(text) => setToInsert(text)}
					placeholder={placeholder}
					multiline={true}
					style={styles.text}
					value={toInsert}
				/>
			</View>
			<View style={styles.content}>
				<Button onPress={() => setShow(false)} text="Cancelar" width="48%" />
				<Button onPress={handleSave} text="Guardar" width="48%" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	text: {
		backgroundColor: "white",
		borderColor: "#003721",
		borderRadius: 8,
		borderWidth: 1,
		padding: 10,
		width: "100%",
	},
	header: {
		gap: 10,
		width: "100%",
	},
});
