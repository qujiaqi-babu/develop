// UserForm.js
import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const UserForm = ({ user }) => {
  const onFinish = async (values) => {
    try {
      await axios.put(`/api/users/${user._id}`, values);
      console.log("用户编辑成功");
    } catch (error) {
      console.error("用户编辑失败", error);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="用户名"
        name="username"
        initialValue={user.username}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="角色"
        name="role"
        initialValue={user.role}
        rules={[{ required: true, message: "请选择角色" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
