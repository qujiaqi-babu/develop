const mongoose = require("mongoose");

// 连接 MongoDB 数据库
mongoose
  .connect("mongodb://localhost:27017/PermissionManageSystem")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// 用户模型
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
const User = mongoose.model("User", userSchema);

module.exports = { User };
