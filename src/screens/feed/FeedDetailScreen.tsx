import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FeedStackParamList } from "../../types/navigation";

type Props = StackScreenProps<FeedStackParamList, "FeedDetail">;

function FeedDetailScreen({ route }: Props) {
  const { id } = route.params;

  return (
    <View>
      <Text>FeedDetailScreen{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default FeedDetailScreen;
