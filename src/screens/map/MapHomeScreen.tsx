import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerButton from "@/components/DrawerButton";
import useAuth from "@/hooks/queries/useAuth";

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const { logoutMutation } = useAuth();
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
      <Text onPress={() => logoutMutation?.mutate(null)}>로그아웃</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
