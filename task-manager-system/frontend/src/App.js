import AppRouter from "./router";
import { HashRouter as Router, NavLink } from "react-router-dom";

function App() {
  return (
    <div style={{ margin: "10px" }}>
      <Router>
        <NavLink to="/register">注册</NavLink> &emsp;||&emsp;
        <NavLink to="/login">登录</NavLink> &emsp;||&emsp;
        <NavLink to="/create-task">创建任务</NavLink> &emsp;||&emsp;
        <NavLink to="/task-list">任务列表</NavLink> &emsp;||&emsp;
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
