import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FeedListScreenProps {}

function FeedListScreen({}: FeedListScreenProps) {
  return (
    <SafeAreaView>
      <Text>FeedListScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default FeedListScreen;
