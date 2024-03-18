// UserList.js
import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const UserList = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("获取用户列表失败", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      message.success("删除成功");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("删除用户失败", error);
    }
  };

  const columns = [
    { title: "用户名", dataIndex: "username", key: "username" },
    { title: "角色", dataIndex: "role", key: "role" },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link">编辑</Button>
          {user.role === "admin" && (
            <Button type="link" danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          )}
        </span>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey="_id" />;
};

export default UserList;
