import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerButton from "@/components/DrawerButton";

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
