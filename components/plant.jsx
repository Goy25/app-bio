import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151E21',
    backgroundColor: '#00C8E0',
    width: "100%",
    borderRadius: 10,
    borderColor: '#00C8E0',
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default function Plant() {
  return (
    <View style={styles.container}>

    </View>
  )
}