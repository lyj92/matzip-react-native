import { MyMapMarkerProps, LatLng } from "react-natvie-maps";

declare module "react-native-maps" {
  export interface MyMapMarkerProps extends MyMapMarkerProps {
    coordinate?: LatLng;
  }
}
