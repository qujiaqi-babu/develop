import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    await axios
      .post("http://localhost:5000/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        alert(response.data);
        setUsername("");
        setEmail("");
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
      <h2>账号注册</h2>
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
            title="不可重名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;邮箱：
          <input
            type="email"
            placeholder="Email"
            title="比如: xxx@qq.com/xxx@ecust.edu.cn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;密码：
          <input
            type="password"
            placeholder="Password"
            title="至少包含1个数字、1个大写字母、1个小写字母的6-18位密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ margin: "10px" }}>
          注册
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </div>
  );
}

export default RegisterForm;
