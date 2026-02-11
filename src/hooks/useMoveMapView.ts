import { useRef, useState } from "react";
import { numbers } from "@/constants/number";
import MapView, { LatLng, Region } from "react-native-maps";
type Delta = Pick<Region, "latitudeDelta" | "longitudeDelta">;
function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  // 확대 정도 상태값
  const [regionDelte, setRegionDelte] = useState<Delta>(numbers.INITIAL_DELTA);
  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelte),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const { latitudeDelta, longitudeDelta } = region;
    setRegionDelte({
      latitudeDelta,
      longitudeDelta,
    });
  };

  return {
    moveMapView,
    handleChangeDelta,
    mapRef,
  };
}

export default useMoveMapView;
