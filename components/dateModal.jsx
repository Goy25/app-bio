import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { Data } from "../utils/context";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  button: {
    borderColor: "#003721",
    borderWidth: 2,
    width: 150,
  },
  container: {
    gap: 20,
    padding: 20,
  },
  dateContent: {
    backgroundColor: "#009658",
    borderColor: "#003721",
    borderRadius: 16,
    borderWidth: 2,
  },
  MYContainerStyle: {
    backgroundColor: "#0ED97F",
  },
});

function DateModal({ visible, setVisible }) {
  const { day, setDay, month, setMonth, year, setYear } = useContext(Data);
  const [date, setDate] = useState(new Date(year, month - 1, day));

  const handleChange = (value) => {
    setDate(value);
    const onlyDate = value.toString().split(" ")[0].split("-");
    setYear(parseInt(onlyDate[0]));
    setMonth(parseInt(onlyDate[1]));
    setDay(parseInt(onlyDate[2]));
  };

  return (
    <Modal visible={visible}>
      <View style={[styles.container, theme.container, theme.flexColumnCenter]}>
        <View style={styles.dateContent}>
          <DateTimePicker
            calendarTextStyle={theme.label}
            headerButtonColor="white"
            headerTextStyle={theme.title}
            mode="date"
            monthContainerStyle={styles.MYContainerStyle}
            onValueChange={handleChange}
            selectedItemColor="#003721"
            value={date}
            weekDaysTextStyle={theme.label}
            yearContainerStyle={styles.MYContainerStyle}
          />
        </View>
        <Pressable onPress={() => setVisible(false)}>
          <Text style={[theme.button, styles.button]}>Cerrar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

export default DateModal;
