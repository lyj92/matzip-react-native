import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { MainDrawerParamList } from "@/types/navigation";
import Ionicons from "@react-native-vector-icons/ionicons";
import { colors } from "@/constants/colors";

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

function DrawerButton() {
  const navigation = useNavigation<Navigation>();
  return (
    <Pressable style={styles.container} onPress={() => navigation.openDrawer()}>
      {/* <Text style={styles?.button}>서랍</Text> */}
      <Ionicons name="menu" size={25} color={colors?.BLACK} />
    </Pressable>
  );
}

const styles = StyleSheet?.create({
  container: {
    paddingHorizontal: 12,
  },
  button: {
    fontSize: 20,
  },
});

export default DrawerButton;
