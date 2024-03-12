const express = require("express");
const session = require("express-session"); // 将数据以session的形式保存在服务端
const cookieParser = require("cookie-parser"); // 通过cookie将数据保存在在客户端中
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // 导入用户模型
const Task = require("./models/task"); // 导入任务模型

const app = express();
const PORT = 5000;

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
app.use(cors());
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
    // console.log(username, email, password);
    // 检查是否已存在同名用户
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).send("用户名有误: 该用户名已存在");
    }
    // 检查邮箱是否合法
    const validEmail = checkEmail(email);
    if (!validEmail) {
      return res.status(400).send("邮箱有误: 格式应为xxx@xx.xx或xxx@xx.xx.xx");
    }
    // 检查密码是否合法
    const validPassword = checkPassword(password);
    if (!validPassword) {
      return res
        .status(400)
        .send(
          "密码有误: 至少包含1个数字、1个大写字母、1个小写字母的6-18位密码"
        );
    }
    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);
    // 创建新用户
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send("用户注册成功！");
  } catch (err) {
    console.error(err);
    res.status(500).send("服务器出错啦！用户注册失败，请稍后重试~");
  }
});

// 用户登录
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    // 检查用户是否存在
    const user = await User.findOne({ username });
    if (!user) {
      // console.log("Login failed");
      return res.status(400).send("用户名不正确，请重新输入");
    }
    // 验证密码是否正确
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // console.log("Login failed");
      return res.status(400).send("密码不正确，请重新输入");
    }
    // 设置 session
    req.session.user = user;
    // console.log("Login successful");
    res.status(201).send({ message: "用户登录成功！", userId: user._id });
  } catch (err) {
    // console.log("Login failed");
    console.error(err);
    res.status(500).send("服务器出错啦！用户登录失败，请稍后重试~");
  }
});

// 退出登录
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

// 获取当前用户
app.get("/user", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// 创建任务
app.post("/taskcreate", async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    // const { title, description } = req.body;
    // userId = req.session.user._id; // 获取当前登录用户的ID
    const task = new Task({ title, description, userId });
    await task.save();
    res.status(201).send("任务创建成功！");
  } catch (err) {
    console.error(err);
    res.status(500).send("服务器出错啦！任务创建失败，请稍后重试~");
  }
});

// 获取任务列表
app.post("/tasklist", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.body.userId });
    // const tasks = await Task.find({ userId: req.session.user._id });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("服务器出错啦！任务列表获取失败，请稍后重试~");
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
      return res.status(404).send("该任务不存在");
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("服务器出错啦！任务详情获取失败，请稍后重试~");
  }
});

// 编辑任务
app.put("/tasks/taskId", async (req, res) => {
  try {
    const { taskId, title, description, userId, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      // { _id: req.params.taskId, userId: req.session.user._id },
      {
        $set: {
          title: title,
          description: description,
          status: status,
        },
      }
    );
    if (!task) {
      return res.status(404).send("该任务不存在");
    } else {
      return res.status(201).send({ message: "任务编辑成功", task: task });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("服务器出错啦！任务编辑失败，请稍后重试~");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
