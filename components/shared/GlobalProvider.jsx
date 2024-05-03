"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0f172a",
              colorTextBase: "#0f172a",
              borderRadius: 6,
              fontSize: 16,
              controlHeight: 42,
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Toaster duration={2000} position="bottom-right" richColors />
            {children}
          </QueryClientProvider>
        </ConfigProvider>
      </AntdRegistry>
    </>
  );
}
