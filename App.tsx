import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigations/RootNavigation";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <RootNavigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
