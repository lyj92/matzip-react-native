import { Profile } from "@/types/domain";
import { getEncryptStorage } from "@/utils/encryptStorage";
import { axiosInstance } from "./axios";

type RequestUser = {
  email: string;
  password: string;
};

// 회원가입
async function postSignup({ email, password }: RequestUser): Promise<void> {
  await axiosInstance.post(`'/auth/signup`, {
    email,
    password,
  });
}

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// 로그인
async function postLogin({
  email,
  password,
}: RequestUser): Promise<ResponseToken> {
  const { data } = await axiosInstance.post(`'/auth/signin`, {
    email,
    password,
  });
  return data;
}

// 프로필 조회
async function getProfile(): Promise<Profile> {
  const { data } = await axiosInstance.get(`'/auth/me`);
  return data;
}

// 토큰 갱신
async function getAccessToken(): Promise<ResponseToken> {
  const refreshToken = await getEncryptStorage("refreshToken");
  const { data } = await axiosInstance.get(`/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
}

// 로그아웃

async function logout() {
  await axiosInstance.get(`/auth/logout`);
}

export { postLogin, postSignup, getAccessToken, getProfile, logout };
