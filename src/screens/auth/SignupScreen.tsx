import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import useForm from "@/hooks/useForm";
import { validateSignup } from "@/utils/validation";

/**
 * 회원가입 페이지
 * @returns
 */
function SignupScreen() {
  const signup = useForm({
    initialValue: { email: "", password: "", passwordConfirm: "" },
    validate: validateSignup,
  });
  return (
    <SafeAreaView style={styles?.container}>
      <View style={styles?.inputContainer}>
        <InputField
          placeholder="이메일"
          touched={signup?.touched?.email}
          error="이메일을 입력해주세요"
          {...signup.getTextInputProps("email")}
        />
        <InputField
          secureTextEntry
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          touched={signup?.touched?.password}
          error="비밀번호를 입력하세요"
          {...signup.getTextInputProps("password")}
        />
        <InputField
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호 확인"
          touched={signup?.touched?.passwordConfirm}
          error="비밀번호를 한 번 더 입력하세요"
          {...signup.getTextInputProps("passwordConfirm")}
        />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" />
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

export default SignupScreen;
