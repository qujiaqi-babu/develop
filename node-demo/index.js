// console.log("Hello World");
const express = require("express"); // 引入express
const app = express(); // 创建app

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const port = 3000; // 本地监听3000端口

// 在nodejs中，crypto模块封装了一系列密码学相关的功能，包括摘要运算。基础例子如下，非常简单：
const crypto = require("crypto");
// var md5 = crypto.createHash("md5");
// var result = md5.update("a").digest("hex");
// 输出：0cc175b9c0f1b6a831c399e269772661
// console.log(result);

const calaMD5 = (data) => {
  return crypto.createHash("md5").update(data).digest("hex");
};

const saveImage = (data, fileName) => {
  // node的魔法变量：__dirname，即当前脚本的路径
  // path.resolve通过结合n个路径得到新的路径
  const outputDirectory = path.resolve(__dirname, "output");
  // 检查目录是否存在，不存在则新建输出文件夹
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
  const fileOutputPath = path.resolve(outputDirectory, fileName);
  if (fs.existsSync(fileOutputPath)) {
    console.log(`File ${fileOutputPath} already exists.`);
    return;
  }
  console.log(`Saving image to ${fileOutputPath}`);
  fs.writeFileSync(fileOutputPath, data);
};

// body-parser提供中间件,通过express提供的use方法可以加载不同的中间件
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader("Content-Type", "text/plain");
//   res.write("you posted:\n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

// 针对根目录的请求返回Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET method route
app.get("/uploadImage", (req, res) => {
  res.send("GET request to the uploadImage");
});

const createErrorResponse = (message) => {
  return {
    success: false,
    message,
  };
};

// POST method route
app.post("/uploadImage", async (req, res) => {
  const { url } = req.body;
  res.setHeader("content-type", "application/json");
  // 校验用户输入的类型
  if (!url) {
    // 400 bad request 代表输入参数不正确
    res.status(400).json(createErrorResponse("URL is required"));
    return;
  }
  try {
    const parseURL = new URL(url);
  } catch (e) {
    res.status(400).json(createErrorResponse("Invalid URL"));
    return;
  }
  try {
    // 一般发起http请求一定是异步的，用async和await处理异步的返回
    const image = await axios.get(url, { responseType: "arraybuffer" });
    // console.log(image.data); // 打印出来是乱码但是没有关系
    const md5 = calaMD5(image.data); // 摘要运算得到加密文件名
    console.log(md5);
    const ext = url.split("?")[0].split(".").pop(); // 获取文件后缀名
    const fileName = `${md5}.${ext}`;
    saveImage(image.data, fileName);
    res.json({
      success: true,
      data: {
        md5,
        fileName,
      },
    });
  } catch {
    res
      .status(500)
      .json(createErrorResponse(`Can't download image from ${url}`));
    return;
  }

  // res.send(JSON.stringify(req.body, null, 2));
  // res.send("POST request to the uploadImage");
});

// 对app进行监听
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
