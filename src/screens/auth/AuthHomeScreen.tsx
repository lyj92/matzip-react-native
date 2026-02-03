import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface AuthHomeScreenProps {}

/**
 * 인증 홈
 * @returns
 */
function AuthHomeScreen({}: AuthHomeScreenProps) {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("hello world");
  }, []);

  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate("Login")}>로그인으로 이동</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
