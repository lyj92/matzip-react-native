import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerButton from "@/components/DrawerButton";
import useAuth from "@/hooks/queries/useAuth";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const { logoutMutation } = useAuth();
  return <MapView style={styles?.containter} provider={PROVIDER_GOOGLE} />;
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
});

export default MapHomeScreen;
