const express = require("express");
const session = require("express-session"); // 将数据以session的形式保存在服务端
const cookieParser = require("cookie-parser"); // 通过cookie将数据保存在在客户端中
const bcrypt = require("bcrypt");
const User = require("./models/user"); // 导入用户模型
const Task = require("./models/task"); // 导入任务模型

const app = express();

// 连接到 MongoDB 数据库
const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/taskManageSystem")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};
connectDb();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);

// 注册路由

// 邮箱格式验证
const checkEmail = (email) => {
  return /^[^\s@]+@[^\s@]+(\.[^\s@]+)+$/.test(email);
};
// 密码格式验证 至少包含1个数字、1个大写字母、1个小写字母 密码包含6-18位数字/字母
const checkPassword = (password) => {
  return /^(?![0-9]+$)(?![A-Z]+$)(?![a-z]+$)[0-9A-Za-z]{6,18}$/.test(password);
};

// 用户注册
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // 检查是否已存在同名用户
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).send("Username already exists");
    }
    // 检查邮箱是否合法
    const validEmail = checkEmail(email);
    if (!validEmail) {
      return res.status(400).send("Invalid Email");
    }
    // 检查密码是否合法
    const validPassword = checkPassword(password);
    if (!validPassword) {
      return res.status(400).send("Invalid Password");
    }
    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);
    // 创建新用户
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// 用户登录
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // 检查用户是否存在
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Username not found");
    }
    // 验证密码是否正确
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).send("Invalid password");
    }
    // 设置 session
    req.session.user = user;
    res.send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// 创建任务
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.session.user._id; // 获取当前登录用户的ID
    const task = new Task({ title, description, userId });
    await task.save();
    res.status(201).send("Task created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// 获取任务列表
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.session.user._id });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// 获取任务详情
app.get("/tasks/taskId", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      userId: req.session.user._id,
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// 编辑任务
app.put("/tasks/taskId", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.session.user._id },
      {
        $set: {
          title: title,
          description: description,
          status: status,
        },
      }
    );
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
