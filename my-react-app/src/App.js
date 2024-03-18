// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { Layout, Menu, Breadcrumb } from "antd";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import LoginForm from "./components/LoginForm";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查用户是否已登录
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await axios.post("/api/logout");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">首页</Menu.Item>
            {isLoggedIn && (
              <Menu.Item key="2" onClick={handleLogout}>
                退出
              </Menu.Item>
            )}
          </Menu>
          {isLoggedIn && <div className="username">欢迎, {user.username}</div>}
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Routes>
              <Route path="/login">
                {isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )}
              </Route>
              <Route path="/" exact>
                {isLoggedIn ? (
                  <UserList user={user} />
                ) : (
                  <Navigate to="/login" />
                )}
              </Route>
              <Route path="/users" exact>
                {isLoggedIn && user.role === "admin" ? (
                  <UserList user={user} />
                ) : (
                  <Navigate to="/" />
                )}
              </Route>
              <Route path="/users/:id/edit">
                {isLoggedIn && user.role === "admin" ? (
                  <UserForm user={user} />
                ) : (
                  <Navigate to="/" />
                )}
              </Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
