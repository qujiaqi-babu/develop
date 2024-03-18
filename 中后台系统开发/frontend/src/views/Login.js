import React, { useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import axios from "axios";
import cookie from "react-cookies";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const App = ({ handleLogin }) => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    await axios
      .post("http://localhost:5000/api/login", values)
      .then((response) => {
        message.success(response.data.message);
        // 登录成功后使用cookie存储用户Id，并设置过期时间
        let expireDate = new Date(new Date().getTime() + 5 * 60 * 1000); // 5分钟后过期
        cookie.save("userId", response.data.userId, {
          expires: expireDate,
          path: "/",
        });
        form.resetFields();
        setErrorMessage("");
        handleLogin(response.data.user);
      })
      .catch((error) => {
        setErrorMessage(error.response.data); // 捕获并设置错误消息
      });
  };

  const onReset = () => {
    form.resetFields();
    setErrorMessage("");
  };
  const onFill = () => {
    form.setFieldsValue({
      username: "Babu",
      password: "123QJQqjq",
    });
    setErrorMessage("");
  };
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={handleSubmit}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          placeholder="input password"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Test data
          </Button>
        </Space>
      </Form.Item>
      {errorMessage && (
        <Form.Item name="error" label="登录异常">
          {errorMessage}
        </Form.Item>
      )}
    </Form>
  );
};
export default App;
