import { useMutation, useQuery } from "@tanstack/react-query";
import { getAccessToken, getProfile, postLogin, postSignup } from "@/api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/api";
import {
  removeEncryptStorage,
  setEncryptStorage,
} from "@/utils/encryptStorage";
import { removeHeader, setHeader } from "@/utils/header";
import { numbers } from "@/constants/number";
import { useEffect } from "react";
import { Profile } from "@/types/domain";
import { useAuthStore } from "@/store/store";
// 회원가입 훅
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

// 로그인 훅
function useLogin(mutationOptions?: UseMutationCustomOptions) {
  const { setIsLogin } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setEncryptStorage("refreshToken", refreshToken);
      // 로그인 성공 시 전역 상태 업데이트
      setIsLogin(true);
    },
    ...mutationOptions,
  });
}

// 토큰 갱신
function useGetRefreshToken() {
  const { setIsLogin } = useAuthStore();
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["auth", "getAccessToken"],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    retry: false,
  });

  // 성공 시 accessToken 저장 + 로그인 상태 true
  useEffect(() => {
    if (isSuccess && data) {
      setHeader("Authorization", `Bearer ${data.accessToken}`);
      setEncryptStorage("refreshToken", data.refreshToken);
      setIsLogin(true);
    }
  }, [isSuccess, data]);

  // 실패 시 토큰 제거 + 로그아웃
  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      removeEncryptStorage("refreshToken");
      setIsLogin(false);
    }
  }, [isError]);

  return { isSuccess, isError };
}

// 프로필 정보 조횐
function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [""],
    ...queryOptions,
  });
}

// useAuth 훅으로 묶음
function useAuth() {
  const { isLogin } = useAuthStore();
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();

  // refreshTokenQuery의 쿼리 결과가 성공이면 useGetProfile 쿼리를 실행
  const { data } = useGetProfile({
    enabled: isLogin,
  });

  return { signupMutation, loginMutation, isLogin };
}

export default useAuth;
