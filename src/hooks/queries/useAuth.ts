import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
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
import queryClient from "@/api/queryClient";
// 회원가입 훅
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

// 로그인 훅
function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setEncryptStorage("refreshToken", refreshToken);
      // 로그인 후 토큰 갱신 훅 동작
      queryClient.fetchQuery({
        queryKey: ["auth", "getAccessToken"],
      });
    },
    ...mutationOptions,
  });
}

// 토큰 갱신
function useGetRefreshToken(mutationOptions?: UseMutationCustomOptions) {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["auth", "getAccessToken"],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  // 성공 시 accessToken 저장
  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader("Authorization", `Bearer ${data.accessToken}`);
        await setEncryptStorage("refreshToken", data.refreshToken);
      }
    })();
  }, [isSuccess]);

  // 실패 시 헤더 리프레시 토큰, Authorization 제거
  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader("Authorization");
        await removeEncryptStorage("refreshToken");
      }
    })();
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
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();

  // refreshTokenQuery의 쿼리 결과가 성공이면 useGetProfile 쿼리를 실행
  const { data, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  return { signupMutation, loginMutation, isLogin };
}

export default useAuth;
