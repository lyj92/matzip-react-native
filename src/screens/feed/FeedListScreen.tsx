import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedStackParamList } from "@/types/navigation";

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedListScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView>
      <Text>FeedListScreen</Text>
      <Text onPress={() => navigation?.navigate("FeedDetail", { id: 1 })}>
        1번 장소
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default FeedListScreen;
