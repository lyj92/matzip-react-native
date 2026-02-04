import { colors } from "@/constants/colors";
import React from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { Text } from "react-native-gesture-handler";

/**
 * PressableProps 해당 이벤트 타입 확장
 */
interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: "filled" | "outlined";
  size?: "large" | "small";
}

function CustomButton({
  label,
  variant = "filled",
  size = "large",
  ...props // => PressableProps
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles?.pressed,
      ]}
      {...props} // Pressable 컴포넌트에 속성 부여
    >
      <Text style={styles[`${variant}Text`]} onPress={() => {}}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  filled: {
    backgroundColor: colors?.PINK_700,
  },
  outlined: {
    backgroundColor: colors?.WHITE,
    borderWidth: 1,
    borderColor: colors?.PINK_700,
  },
  filledText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors?.WHITE,
  },
  outlinedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors?.PINK_700,
  },

  large: {
    width: "100%",
    height: 45,
  },

  small: {
    paddingHorizontal: 10,
    height: 35,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
