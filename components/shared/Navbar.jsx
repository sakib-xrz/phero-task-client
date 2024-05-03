"use client";

import useUserStore from "@/store";
import { Button } from "antd";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useUserStore();
  return (
    <div className="flex items-center justify-between">
      Navbar
      <div>
        {user ? (
          <Button type="primary" size="small" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link href={"/login"}>
            <Button type="primary" size="small">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
