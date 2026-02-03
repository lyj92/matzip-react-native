import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface AuthHomeScreenProps {}

/**
 * 인증 홈
 * @returns
 */
function AuthHomeScreen({}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <Text>AuthHomeScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
