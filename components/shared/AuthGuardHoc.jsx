"use client";

import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import useStore from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuardHoc({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, setUser } = useStore();
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      if (pathname) {
        const nextURL = { next: pathname };
        const queryParams = new URLSearchParams(nextURL).toString();
        router.push(`/login?${queryParams}`);
      }
      router.push("/login");
    } else {
      setUser(token);
    }
  }, [user?.email, pathname, router, setUser]);

  if (isLoading) {
    <div>Loading...</div>;
  }

  return user ? children : null;
}
