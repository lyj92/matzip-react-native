import React from "react";
import { AuthNavigation } from "./AuthNavigation";
import DrawerNavigation from "./DrawerNagation";
import useAuth from "@/hooks/queries/useAuth";

function RootNavigation() {
  // useAuth 호출해야 useGetRefreshToken이 실행되어 앱 재시작 시 토큰 체크
  const { isLogin } = useAuth();

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
