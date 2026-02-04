import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

function DrawerButton() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text style={styles?.button}>서랍</Text>
    </Pressable>
  );
}

const styles = StyleSheet?.create({
  button: {
    fontSize: 20,
  },
});

export default DrawerButton;
