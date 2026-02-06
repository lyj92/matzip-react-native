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

function useGetProfile(UseMutationOptions: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [""],
    ...queryOptions,
  });
}

export { useSignup, useLogin, useGetRefreshToken, useGetProfile };
