import { axiosInstance } from "@/api/axios";

// 헤더 설정
function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

// 헤더 삭제
function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
}

export { setHeader, removeHeader };
