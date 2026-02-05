import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import useForm from "@/hooks/useForm";
interface LoginScreenProps {}

/**
 * 로그인 페이지
 * @returns
 */

function LoginScreen({}: LoginScreenProps) {
  const login = useForm({
    initialValue: { email: "", password: "", passwordConfirm: "" },
  });

  return (
    <SafeAreaView style={styles?.container}>
      <View style={styles?.inputContainer}>
        <InputField
          placeholder="이메일"
          error={"이메일을 입력하세요"}
          {...login?.getTextInputProps("email")}
        />
        <InputField
          secureTextEntry
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          {...login?.getTextInputProps("password")}
        />
      </View>
      <CustomButton label="로그인" variant="filled" size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
