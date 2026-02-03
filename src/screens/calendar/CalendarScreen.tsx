import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CalendarScreenProps {}

function CalendarScreen({}: CalendarScreenProps) {
  return (
    <SafeAreaView>
      <Text>CalendarScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default CalendarScreen;
