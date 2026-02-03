import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface LoginScreenProps {}

/**
 * 로그인 페이지
 * @returns
 */
function LoginScreen({}: LoginScreenProps) {
  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default LoginScreen;
