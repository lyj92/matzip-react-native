import { Marker } from "@/types/domain";
import axiosInstance from "./axios";

/**
 * 등록된 마커 배열 조회
 * @return Post 타입 데이터 반환
 */
async function getMarkers(): Promise<Marker[]> {
  const { data } = await axiosInstance.get(`/markers`);
  return data;
}

export { getMarkers };
