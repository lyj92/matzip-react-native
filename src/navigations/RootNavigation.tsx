import React from "react";
import { AuthNavigation } from "./AuthNavigation";
import DrawerNavigation from "./DrawerNagation";

function RootNavigation() {
  const isLogin = true;
  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
