import { getCartByUserId } from "@/services/cart.api";
import { create } from "zustand";

interface AuthState {
  userDetail: any;
  userId: string;
  isLoading: boolean;
  setUser: (user: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  userDetail: null,
  userId: "",
  isLoading: false,

  setUser: async (user: any) => {
    set({ userDetail: user, userId: user?._id, isLoading: true });
  },
}));
