import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { Navigate } from "react-router-dom";
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
  const [addFinished, setAddFinished] = useState(false);

  const handleSubmit = async (values) => {
    await axios
      .post("http://localhost:5000/api/register", values)
      .then((response) => {
        message.success("用户添加成功");
        // form.resetFields();
        setErrorMessage("");
        setAddFinished(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data); // 捕获并设置错误消息
      });
  };

  const onCancel = () => {
    setAddFinished(true);
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "测试数据，将以普通用户身份注册",
      username: "Babu",
      email: "1058509662@qq.com",
      password: "123QJQqjq",
      role: "user",
    });
    setErrorMessage("");
  };

  if (addFinished) {
    return <Navigate to="/user-list" />;
  }

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
            Add
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
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
