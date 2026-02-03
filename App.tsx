import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigation } from "./src/navigations/AuthNavigation";
// import DrawerNavigation from "./src/navigations/DrawerNagation";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <AuthNavigation />
      {/* <DrawerNavigation /> */}
    </SafeAreaProvider>
  );
}
