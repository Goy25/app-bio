import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ExportField from "./Components/ExportField";
import ImportField from "./Components/ImportField";
import Loading from "./Components/Loading";
import theme from "../General/theme";

export default function ExportScreen() {
	const [loadingText, setLoadingText] = useState("");
	const [visible, setVisible] = useState(false);

	return (
		<View style={[theme.container]}>
			<FlatList
				data={[]}
				renderItem={null}
				ListHeaderComponent={
					<View style={styles.header}>
						<ExportField setVisible={setVisible} setText={setLoadingText} />
						<ImportField setVisible={setVisible} setText={setLoadingText} />
					</View>
				}
				contentContainerStyle={[styles.container, theme.flexColumnCenter]}
			/>
			<Loading visible={visible} text={loadingText} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		minHeight: "100%",
    paddingVertical: 2
	},
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: "5%",
  }
});
