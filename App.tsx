import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  StatusBar,
  Platform,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

/**
Android에서 SafeArea 제대로 작동시키려면:
1. react-native-safe-area-context 설치
2. StatusBar translucent={true} 필수!
3. SafeAreaView 사용
 * */

function AppContent() {
  const [value, setValue] = useState("");

  return (
    <>
      {/* 이게 핵심! */}
      <StatusBar
        // barStyle="light-content" // 흰색글자
        barStyle="dark-content" // 검은글자
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView style={styles.safeareaview} edges={["top", "bottom"]}>
        <Text>이제 되는거냐</Text>
      </SafeAreaView>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  container1: {
    height: Dimensions.get("screen").height / 2, // 기기 스크린 값의 비율 계산
    backgroundColor: "red",
  },
  container2: {
    backgroundColor: "blue",
  },
  text2: {
    color: "white",
    fontSize: 40,
  },
  body: {
    backgroundColor: "red",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  text: {
    color: "white",
    fontSize: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
});
