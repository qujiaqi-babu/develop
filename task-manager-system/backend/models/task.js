const mongoose = require("mongoose");

// 每个schema都映射到MongoDB集合,并定义该集合中文档的结构
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
