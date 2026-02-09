import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DrawerButton from "@/components/DrawerButton";
import useAuth from "@/hooks/queries/useAuth";
import MapView, { LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Geolocation from "@react-native-community/geolocation";
interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const { logoutMutation } = useAuth();

  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);

  const mapRef = useRef<MapView | null>(null);

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    moveMapView(userLocation);
  };

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
        ref={mapRef}
        style={styles?.containter}
        provider={PROVIDER_GOOGLE}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles?.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <FontAwesome6
            name="location-crosshairs"
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
          />
        </Pressable>
      </View>
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
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.5)",
  },
  buttonList: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
});

export default MapHomeScreen;
