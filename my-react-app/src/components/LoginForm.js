// LoginForm.js
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/login", values);
      onLogin(response.data);
    } catch (error) {
      console.error("登录失败", error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
