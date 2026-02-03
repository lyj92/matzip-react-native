import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface SignupScreenProps {}

/**
 * 회원가입 페이지
 * @returns
 */
function SignupScreen({}: SignupScreenProps) {
  return (
    <SafeAreaView>
      <Text>SignupScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default SignupScreen;
