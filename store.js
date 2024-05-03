import { create } from "zustand";
import { AUTH_TOKEN_KEY } from "./common/KeyChain";
import HttpKit from "./common/HttpKit";
import ApiKit from "./common/ApiKit";

const useUserStore = create(() => ({
  user: null,
  isLoading: false,

  setToken: (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  setUser: (token) => {
    useUserStore.setState({ isLoading: true });
    HttpKit.setTokenAndRedirect(token);
    ApiKit.me
      .getMe()
      .then(({ data }) => {
        useUserStore.setState({ user: data?.user });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        useUserStore.setState({ isLoading: false });
      });
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    useUserStore.setState({ user: null });
  },
}));

export default useUserStore;
