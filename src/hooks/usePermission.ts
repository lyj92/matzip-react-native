import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { alerts } from "@/constants/messages";
type PermissionType = "LOCATION" | "PHOTO";

const androidPermission = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermission = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === "android";
      const permissionOs = isAndroid ? androidPermission : iosPermission;
      const checked = await check(permissionOs[type]);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            { text: "설정하기", onPress: () => Linking.openSettings() },
            { text: "취소", style: "cancel" },
          ]
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          {
            if (isAndroid) {
              showPermissionAlert();
              return;
            }
          }

          await request(permissionOs[type]);
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
      }
    })();
  }, []);
}

export default usePermission;
