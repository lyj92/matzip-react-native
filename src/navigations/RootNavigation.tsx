import React from "react";
import { AuthNavigation } from "./AuthNavigation";
import DrawerNavigation from "./DrawerNagation";
import useAuth from "@/hooks/queries/useAuth";
function RootNavigation() {
  const { isLogin } = useAuth();
  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
