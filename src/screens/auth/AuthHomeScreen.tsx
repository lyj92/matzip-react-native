import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../types/navigation";

// 전역 네비게이션 타입 선언 (auth)
type Navigation = StackNavigationProp<AuthStackParamList>;

/**
 * 인증 홈
 * @returns
 */
function AuthHomeScreen() {
  const navigation = useNavigation<Navigation>();

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
