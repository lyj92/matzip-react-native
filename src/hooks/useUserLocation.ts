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

  // 초기 마운트 시 위치 가져오기
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
  }, []);

  // 백그라운드 → 포그라운드 복귀 시 위치 재요청 (설정에서 권한 변경 후 대응)
  useEffect(() => {
    if (!isComeBack) return;

    Geolocation.getCurrentPosition(
      (info) => {
        setUserLocation(info.coords);
        setIsUserLocationError(false);
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
