"use client";

import { Button, Form, Input } from "antd";

export default function Home() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="max-w-7xl mx-auto min-h-screen space-y-6 mt-5 px-5">
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
