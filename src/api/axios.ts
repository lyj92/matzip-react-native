import axios from "axios";
import { Platform } from "react-native";

/**
 * 실제 기기로 테스트 할 시
 * 맥의 경우 해당 와이파이 ip주소로 baseUrl 설정
 * ifconfig | grep inet 이 명령어를 해당 터미널에서 실행시 ip확인 가능
 * http://192.168.0.5:3030 끝자리 3030 포트는 Nest.js 서버 포트번호
 */

export const baseUrls = {
  android: "http://10.0.2.2:3030",
  ios: "http://localhost:3030",
};

const axiosInstance = axios.create({
  baseURL: Platform?.OS === "android" ? baseUrls.android : baseUrls.ios,
});

export { axiosInstance };
