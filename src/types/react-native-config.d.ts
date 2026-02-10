/**
   declare module 'react-native-config' {
  export interface NativeConfig {
      HOSTNAME?: string;
  }
  
  export const Config: NativeConfig
  export default Config
} 
 */

declare module "react-native-config" {
  export interface NativeConfig {
    // .env에 설정한 구글 맵 키 값으로 변경
    GOOGLE_MAP_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
