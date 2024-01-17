import { ActivityIndicator, Modal, Text, View } from "react-native";
import theme from "../utils/theme";

function Loading({ visible, text }) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
    >
      <View style={[theme.container, theme.flexColumnCenter]}>
        <ActivityIndicator size="" color="#003721" />
        <Text style={[theme.title, {color: "#003721"}]}>{text}</Text>
      </View>
    </Modal>
  );
}

export default Loading;