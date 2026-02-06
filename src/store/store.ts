import { create } from "zustand";

type AuthStore = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  setIsLogin: (value: boolean) => set({ isLogin: value }),
}));
