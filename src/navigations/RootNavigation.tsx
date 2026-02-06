import React, { useState } from "react";
import { AuthNavigation } from "./AuthNavigation";
import DrawerNavigation from "./DrawerNagation";
import useAuth from "@/hooks/queries/useAuth";
import { useAuthStore } from "@/store/store";
function RootNavigation() {
  const { isLogin } = useAuthStore();

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
