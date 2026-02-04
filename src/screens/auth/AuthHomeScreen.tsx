/**
 * StackScreenProps vs StackNavigationProp 차이
 *
 * StackNavigationProp<ParamList>
 * - navigation만 포함 (route 없음)
 * - useNavigation() 훅과 함께 사용
 * - 파라미터를 받을 필요 없이, 다른 스크린으로 이동만 할 때 사용
 *
 * 이 스크린에서 StackNavigationProp를 사용하는 이유:
 * - AuthHome 스크린은 파라미터를 받지 않음 (undefined)
 * - 단순히 Login, Signup 등 다른 스크린으로 이동만 하면 됨
 * - useNavigation() 훅으로 navigation 객체를 가져와서 사용
 *
 * 사용 예시:
 * const navigation = useNavigation<Navigation>();
 * navigation.navigate('Login');  // 이동만 하면 됨
 */
import { AuthStackParamList } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants/colors";

// StackNavigationProp: navigation만 포함 (이동 기능만 필요할 때)
// route.params가 필요 없으므로 StackScreenProps 대신 이것을 사용
type Navigation = StackNavigationProp<AuthStackParamList>;

/**
 * 인증 홈
 * @returns
 */
function AuthHomeScreen() {
  // useNavigation 훅에 타입 지정하여 navigation 객체 가져오기
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles?.imageContainer}>
        <Image
          style={styles?.image}
          source={require("@/assets/matzip.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles?.buttonContainer}>
        <CustomButton
          label={"이메일 로그인"}
          onPress={() => navigation.navigate("Login")}
        />
        <Pressable onPress={() => navigation?.navigate("Signup")}>
          <Text style={styles?.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: { flex: 1.5, alignItems: "center" },
  image: {
    width: 200,
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 5,
  },
  emailText: {
    textDecorationLine: "underline",
    fontWeight: 500,
    padding: 10,
    color: colors?.BLACK,
  },
});

export default AuthHomeScreen;
