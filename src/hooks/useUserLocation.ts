import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import useAppState from "./useAppState";
/**
 * 구글 지도 위도 경도 가져오는 훅
 * @returns
 */
function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);

  const { isComeBack } = useAppState();

  useEffect(() => {
    if (!isComeBack) return;

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
  }, [isComeBack]);

  return { userLocation, isUserLocationError };
}

export default useUserLocation;
