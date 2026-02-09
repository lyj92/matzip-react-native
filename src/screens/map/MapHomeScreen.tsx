import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import DrawerButton from "@/components/DrawerButton";
import useAuth from "@/hooks/queries/useAuth";
import MapView, { LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import Geolocation from "@react-native-community/geolocation";
interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const { logoutMutation } = useAuth();

  const [userLocation, setUserLocation] = useState<LatLng>();
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);

  // inset 값 구하는 함수
  const inset = useSafeAreaInsets();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setUserLocation(info.coords);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      }
    );
  });

  return (
    <>
      <DrawerButton
        style={[styles?.drawerButton, { top: inset.top + 10 }]}
        color={colors.WHITE}
      />
      <MapView
        style={styles?.containter}
        provider={PROVIDER_GOOGLE}
        // 초기 경도 위도 설정
        // initialRegion={{
        //   latitude: info.coords.,
        //   longitude: 126.978,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  drawerButton: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.5)",
  },
});

export default MapHomeScreen;
