import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    await axios
      .post("http://localhost:5000/login", {
        username,
        password,
      })
      .then((response) => {
        alert(response.data.message);
        // 登录成功后将用户ID存储在本地存储中
        localStorage.setItem("userId", response.data.userId);
        setUsername("");
        setPassword("");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data); // 捕获并设置错误消息
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>用户登录</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "10px" }}>
          用户名：
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;密码：
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ margin: "10px" }}>
          登录
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </div>
  );
}

export default LoginForm;
