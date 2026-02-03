import React, {useState} from "react";
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
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

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
        <View style={styles?.container1}>
          <Text style={styles.text}>텍스트</Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
          />
          <Button title="버튼이름" onPress={() => console.log("hi")} />
        </View>

        <View style={styles?.container2}>
          <Text style={styles.text2}>텍스트</Text>
        </View>
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
