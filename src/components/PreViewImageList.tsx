import { baseUrls } from "@/api/axios";
import { colors } from "@/constants/colors";
import { ImageUri } from "@/types/domain";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
  Platform,
} from "react-native";

interface PreViewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
}

function PreViewImageList({ imageUris, onDelete }: PreViewImageListProps) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {imageUris?.map(({ uri }) => {
        return (
          <Pressable style={styles.imageContainer} key={uri}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                }/${uri}`,
              }}
              resizeMode="cover"
            />
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete?.(uri)}
            >
              <Ionicons name="close" size={16} color={colors.WHITE} />
            </Pressable>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: colors.BLACK,
  },
  container: {
    gap: 15,
    paddingHorizontal: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default PreViewImageList;
