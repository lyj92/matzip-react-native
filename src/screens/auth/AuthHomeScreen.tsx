import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text onPress={() => navigation.navigate("Login")}>로그인으로 이동</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthHomeScreen;
