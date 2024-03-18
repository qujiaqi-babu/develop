import React from "react";
import { Table } from "antd";

const PermissionList = () => {
  const columns = [
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "权限描述",
      dataIndex: "description",
      key: "description",
    },
  ];

  const roles = [
    {
      _id: "1",
      role: "admin",
      description:
        "管理员，可以对除自己以外的所有用户修改角色权限、删除用户、添加新用户",
    },
    {
      _id: "2",
      role: "user",
      description: "普通用户，仅可以查看用户列表、修改自己的个人信息",
    },
  ];

  return <Table dataSource={roles} columns={columns} rowKey="_id" />;
};

export default PermissionList;
