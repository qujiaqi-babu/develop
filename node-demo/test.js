const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/taskManageSystem");
  console.log("数据库连接成功");
};
connectDb();
