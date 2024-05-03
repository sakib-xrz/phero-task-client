import { create } from "zustand";
import { AUTH_TOKEN_KEY } from "../common/KeyChain";
import HttpKit from "../common/HttpKit";
import ApiKit from "../common/ApiKit";

const useStore = create(() => ({
  user: null,
  isLoading: false,

  setToken: (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  setUser: (token) => {
    useStore.setState({ isLoading: true });
    HttpKit.setTokenAndRedirect(token);
    ApiKit.me
      .getMe()
      .then(({ data }) => {
        useStore.setState({ user: data?.user });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        useStore.setState({ isLoading: false });
      });
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    useStore.setState({ user: null });
  },
}));

export default useStore;
