"use client";

import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import useUserStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuardHoc({ children }) {
  const router = useRouter();
  const { user, isLoading, setUser } = useUserStore();
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      router.push("/login");
    } else {
      setUser(token);
    }
  }, [user?.email, router, setUser]);

  if (isLoading) {
    <div>Loading...</div>;
  }

  return user ? children : null;
}
