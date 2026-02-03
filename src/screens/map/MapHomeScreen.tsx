import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
