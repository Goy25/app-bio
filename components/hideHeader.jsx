import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function HideHeader({ style, up, setUp }) {
  return (
    <Pressable onPress={() => setUp(!up)} style={style}>
      <AntDesign name={up ? "up" : "down"} size={40} color="white" />
    </Pressable>
  );
}

export default HideHeader;