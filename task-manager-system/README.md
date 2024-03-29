### 作业要求

使用Node.js和Express框架创建一个简单的任务管理系统，能够实现用户的注册、登录、创建任务、查看任务、编辑任务等功能。

设计任务管理系统的数据结构，包括用户、任务等

使用MongoDB数据库，创建一个新的数据库，并连接到 Node.js项目中

实现用户的注册和登录功能，包括表单验证、密码加密等

使用 session 和 cookie，实现用户的登录状态保持

实现任务的创建、查看和编辑功能，包括任务列表、任务详情等页面的渲染

学习如何使用表单验证和数据存储，确保任务数据的有效性和一致性

### 项目结构

使用 React （前端）和 Express（后端） 实现前后端分离的任务管理系统，数据库采用 MongoDB（先新建一个数据库 taskManageSystem）。

**backend-后端**

- models
  - task.js-任务模型
  - user.js-用户模型
- package.json-后端文件的依赖项
- server.js-需要对数据库进行操作的各种API

**frontend-前端**

- src
  - component-基本组件
    - TaskItem.js-任务列表中的一个任务项
  - router
    - index.js-配置页面路由
  - views-各路由视图组件
    - CreateTaskForm.js-创建任务界面
    - LoginForm.js-登录界面
    - RegisterForm.js-注册界面
    - TaskList.js-任务列表展示（查看任务详情、任务编辑）
  - App.js-根组件（设置导航栏）
  - index.js-入口
- package.json-前端文件的依赖项

**example-测试用例**

**README.md-项目简介&环境配置等**

### 创建项目并安装依赖包

```bash
mkdir task-manager
cd task-manager
npx create-react-app frontend
cd frontend
npm install axios react-router-dom 
cd ..
mkdir backend
cd backend
npm init
npm install express mongoose bcrypt express-session cookie-parser cors
```

启动前端

```bash
cd frontend
npm run start
```

启动后端

```bash
cd backend
node server.js
```

### 实现的功能

- 用户注册
  - 对邮箱格式、密码安全性进行校验，提示注册不成功的原因，对密码进行加密存储


<img src="example\image-20240312235215118.png"/>

<img src="example\image-20240313001643132.png"/>

后台数据库：

<img src="example\image-20240313003036710.png"/>

- 用户登录
  - 对用户名和密码进行校验，提示登录不成功的原因并允许重新输入

<img src="example\image-20240313003215138.png"/>

<img src="example\image-20240313003249946.png"/>

<img src="example\image-20240313002645005.png"/>

- 创建新的任务
  - 创建新的任务并同步到后台数据库

<img src="example\image-20240312235441369.png"/>

- 获取任务列表
  - 仅展示当前登录用户创建的任务列表

<img src="example\image-20240313002256800.png"/>

- 查看任务详情
  - 展示任务详情，如任务标题、任务描述、任务状态

<img src="example\image-20240313002417542.png"/>

- 任务编辑
  - 修改任务信息并同步更新到数据库，如任务标题、任务描述、任务状态

<img src="example\image-20240313002444139.png"/>

<img src="example\image-20240313002511780.png"/>

后台数据库：

<img src="example\image-20240313003626192.png"/>

### 实现过程中遇到的问题

1.前端运行在端口 3000 上，后端运行在端口 5000 上，会存在跨域问题

解决方案：

在 Express 应用中使用 CORS（跨源资源共享）中间件来允许来自前端的跨域请求。安装 cors 库并将其添加到 Express 应用中即可。

```bash
npm install cors
```

```js
const express = require("express");
const cors = require("cors"); // 引入cors
const app = express();
app.use(cors()); // 使用cors中间件
```

2.使用 Postman 进行后端 api 测试时，req.session.user.\_id 可以正常获取当前登录用户 id，但在浏览器中使用 api 进行测试时，req.session.user.\_id 为 undefined

解决方案：

用户登录成功后，后端将用户的 id 返回给浏览器，前端将用户的 id 存储在 localStorage 中，需要时通过 localStorage.getItem("userId")获取（具体原因有空再研究，先把功能实现了再说）。
