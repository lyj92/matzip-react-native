import { colors } from "@/constants/colors";
import React, { Ref } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  error?: string;
  disabled?: boolean;
  touched?: boolean;
}

function InputField({
  ref,
  error,
  disabled = false,
  touched,
  ...props
}: InputFieldProps) {
  return (
    <View>
      <TextInput
        placeholderTextColor={colors.GRAY_500}
        ref={ref}
        autoCorrect={false}
        spellCheck={false}
        style={[
          styles?.input,
          disabled && styles.disabled,
          props.multiline && styles.multiline,
          touched && Boolean(error) && styles?.inputError,
        ]}
        editable={!disabled}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles?.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors?.GRAY_200,
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors?.BLACK,
  },

  multiline: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: "top",
  },

  error: {
    color: colors?.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors?.RED_300,
  },

  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
});

export default InputField;
