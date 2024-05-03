import { create } from "zustand";
import { AUTH_TOKEN_KEY } from "./common/KeyChain";

const useUserStore = create(() => ({
  user: null,
  setToken: (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
}));

export default useUserStore;
