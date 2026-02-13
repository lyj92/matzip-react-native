import { colors } from "@/constants/colors";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomMarker from "./CustomMarker";

interface MarkerColorInputProps {
  color: string;
  score: number;
  onChangeColor: (value: string) => void;
}

function MarkerColorInput({
  onChangeColor,
  color,
  score,
}: MarkerColorInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors.PINK_400,
            colors.BLUE_400,
            colors.YELLOW_400,
            colors.GREEN_400,
            colors.PURPLE_400,
          ].map((selectColor) => {
            return (
              <Pressable
                key={selectColor}
                onPress={() => onChangeColor(selectColor)}
                style={[
                  styles.markerBox,
                  color === selectColor && styles.pressedMarker,
                ]}
              >
                <View style={styles.ressabledBox}>
                  <CustomMarker color={selectColor} score={score} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 20,
  },
  markerInputScroll: {
    flexDirection: "row",
    gap: 20,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerBox: {
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: colors.GRAY_300,
  },
  ressabledBox: {
    margin: "auto",
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerColorInput;
