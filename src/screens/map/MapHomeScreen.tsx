import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import DrawerButton from "@/components/DrawerButton";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import useUserLocation from "@/hooks/useUserLocation";
import { numbers } from "@/constants/number";
import usePermission from "@/hooks/usePermission";
import Toast from "react-native-toast-message";
import CustomMarker from "@/components/CustomMarker";
import useMoveMapView from "@/hooks/useMoveMapView";
import MapIconButton from "@/components/MapIconButton";
import { useNavigation } from "@react-navigation/native";
import { MapStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import useGetMarkers from "@/hooks/queries/useGetMarkers";

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const navigation = useNavigation<Navigation>();

  const { handleChangeDelta, moveMapView, mapRef } = useMoveMapView();

  // inset 값 구하는 함수
  const inset = useSafeAreaInsets();

  // 마커 배열 조회
  const { data: markers = [] } = useGetMarkers();

  console.log(markers, "markers");

  const { userLocation, isUserLocationError } = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);

  usePermission("LOCATION");

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: "error",
        text1: "위치 권한을 허용해주세요.",
        position: "bottom",
      });

      return;
    }
    moveMapView(userLocation);
  };

  // 마커 클릭 시 해당 마커 기준으로 이동
  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

  // 장소 등록 핸들러
  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        "추가할 위치를 선택해주세요.",
        "지도를 길게 누르면 위치가 선택됩니다."
      );
      return;
    }

    navigation.navigate("AddLocation", { location: selectLocation });
    setSelectLocation(null);
  };

  return (
    <>
      <DrawerButton
        style={[styles?.drawerButton, { top: inset.top + 10 }]}
        color={colors.WHITE}
      />
      <MapView
        googleMapId="c91abfa80c861a9c8b815800"
        ref={mapRef}
        style={styles?.containter}
        provider={PROVIDER_GOOGLE}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        onRegionChangeComplete={handleChangeDelta}
        onLongPress={({ nativeEvent }) =>
          setSelectLocation(nativeEvent.coordinate)
        }
      >
        {markers.map(({ id, score, color, ...coordinate }) => (
          <CustomMarker
            key={id}
            score={score}
            color={color}
            coordinate={coordinate}
            onPress={() => handlePressMarker(coordinate)}
          />
        ))}

        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>

      <View style={styles?.buttonList}>
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
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
