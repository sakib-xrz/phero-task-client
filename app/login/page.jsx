"use client";

import Image from "next/image";
import logo from "@/public/logo.png";

import { Button, Form, Input } from "antd";
import Link from "next/link";
import ApiKit from "@/common/ApiKit";
import useStore from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import HttpKit from "@/common/HttpKit";
import { toast } from "sonner";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const previousURL = searchParams.get("next");
  const { setUser, setToken } = useStore();

  const onFinish = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    const promise = ApiKit.auth
      .login(payload)
      .then(({ data }) => {
        setToken(data.access);
        // Set token and redirect
        HttpKit.setTokenAndRedirect(data.access, () => {
          if (previousURL) {
            router.push(previousURL);
          }
          router.push("/");
        });
      })
      .catch((error) => {
        throw error;
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Logged in successfully!",
      error: (error) => error.message,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="px flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto w-full sm:w-2/3 sm:py-10 xl:w-1/3">
        <div className="space-y-8 rounded-md bg-white px-8 py-10 shadow">
          <div className="flex justify-center">
            <Image
              src={logo}
              loading="eager"
              alt="logo"
              quality={100}
              className="h-auto w-6/12"
            />
          </div>
          <h2 className=" text-center text-3xl font-semibold">
            Login to your account
          </h2>

          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            initialValues={{
              email: "sakib@gmail.com",
              password: "123456",
            }}
            requiredMark={false}
          >
            <Form.Item
              label={<p className="font-semibold">Email</p>}
              name="email"
              rules={[
                {
                  message: "Please input your email!",
                  required: true,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // email pattern
                },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>

            <Form.Item
              label={<p className="font-semibold">Password</p>}
              name="password"
              rules={[
                {
                  message: "Please input your password!",
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>

            <p className="text-center text-sm font-medium leading-none">
              Don’t have an account?{" "}
              <Link
                href={"/register"}
                className="p-0 font-semibold text-primary hover:underline"
              >
                Create Account
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
