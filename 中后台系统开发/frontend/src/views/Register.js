import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import axios from "axios";
const { Option } = Select;
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
const App = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    await axios
      .post("http://localhost:5000/api/register", values)
      .then((response) => {
        message.success(response.data);
        // form.resetFields();
        setErrorMessage("");
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
      note: "测试数据，将以管理员身份注册",
      username: "Babu",
      email: "1058509662@qq.com",
      password: "123QJQqjq",
      role: "admin",
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
        name="email"
        label="邮箱"
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
      <Form.Item
        name="role"
        label="角色"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a option" allowClear>
          <Option value="user">普通用户</Option>
          <Option value="admin">管理员</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Register
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
        <Form.Item name="error" label="注册异常">
          {errorMessage}
        </Form.Item>
      )}
    </Form>
  );
};
export default App;
