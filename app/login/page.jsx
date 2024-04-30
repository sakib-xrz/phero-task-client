"use client";
import Image from "next/image";
import logo from "@/public/logo.png";

import { Button, Form, Input } from "antd";
import Link from "next/link";
import Container from "@/components/shared/Container";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
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
                },
              ]}
            >
              <Input />
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
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>

            <p className="text-center text-sm font-medium leading-none">
              Don’t have an account?{" "}
              <Link href={"/register"} className="hover:underline">
                <Button type="link" className="text-primary p-0">
                  Create Account
                </Button>
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
