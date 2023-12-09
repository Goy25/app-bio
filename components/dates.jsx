import Plant from './plant';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151E21',
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 10,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});

export default function Dates() {
  return (
    <View style={styles.container}>
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />
    </View>
  )
}