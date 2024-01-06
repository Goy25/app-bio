import {
  Pressable,
} from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function HeaderAdd() {

  return (
    <>
      <Pressable style={{marginRight: 10}}>
        <Entypo name="circle-with-plus" size={40} color="white" />
      </Pressable>
    </>
  );
}
