### 作业要求

1.做一个登录页，登录完之后，cookie种入标识，防止下次再重复登录，cookie有过期时间。

2.设计一个权限管理，给1中用户分配权限。

3.做一个列表页和表单填写页。



### 创建项目并安装依赖包

```bash
mkdir permission-management-system
cd permission-management-system
npx create-react-app frontend
cd frontend
npm install axios react-router-dom antd react-cookies
npm install @ant-design/icons --save
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



### 项目结构

使用 React、Antd （前端）和 Express（后端） 实现前后端分离的权限管理系统，数据库采用 MongoDB（新建数据库 PermissionManageSystem）。

**backend-后端**

- models.js-连接MongoDB数据库并构建用户模型
  - 字段包含：username、 email、 password、 role（ "user" / "admin" ）
  - role为用户角色，不同角色拥有不同的操作权限

- package.json-后端文件的依赖项
- server.js-需要对数据库进行操作的各种API

**frontend-前端**

- public
  - index.html

- src
  - component-自定义组件
    - Menu.js-自定义侧边菜单栏
  - views-各路由视图组件
    - Login.js-登录界面
    - PermissionList.js-角色权限列表展示
    - Register.js-注册界面
    - UserAdd.js-新增用户表单填写页
    - UserEdit.js-用户信息编辑页（管理员可修改用户角色，用户可修改个人信息）
    - UserList.js-用户列表展示（用户名、邮箱、角色、当前登录用户可执行的操作）
  - App.js-根组件，主要包含页面布局、配置页面路由，根据cookie信息检查用户登录状态，当用户在未登录状态下访问页面时自动跳转至登录页面。
  - index.js-挂载根节点到index.html
- package.json-前端文件的依赖项



### 权限管理设计

用户通过角色间接拥有权限。

- 当前登录用户角色为管理员（admin）：具备对其他用户列表增删改查操作，可以添加新用户、删除用户、修改用户角色（自己的除外）、查看用户列表。
- 当前登录用户角色为普通用户（user）：仅可以修改自己的个人信息（不可修改角色）、查看用户列表。

![image-20240318225351388](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318225351388.png)



### 实现的功能

- 用户登录后，cookie种入标识，会在一段时间内保持登录状态，5分钟后过期（可在frontend/src/views/Login.js第30行修改过期时间）。
- 根据当前登录用户角色的不同，展示不同的操作界面，从而实现一个简单的权限控制系统。
- 管理员登录后可修改其他用户的角色，从而修改其他用户的权限，实现权限管理。



### 测试用例

1.注册管理员用户“Babu”=>登录=>查看用户列表=>创建新用户=>修改用户角色=>删除新用户=>退出登录

- 为了方便进行功能测试，点击“Test data”，系统将自动填充表单信息。点击Register按钮，后台会对用户名（是否注册过）、邮箱（是否格式正确）、密码（安全性检测并加密存储）进行校验，校验失败则展示报错信息。

![image-20240318221223959](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318221223959.png)

后台数据库：

![image-20240318222401562](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318222401562.png)

- 点击Login按钮，后台会对用户名、密码进行后台数据库校验，校验失败则展示报错信息。登录成功则将用户Id保存到cookie中，并自动跳转到用户列表展示页。登录状态下，页面右上角会显示当前登录用户的角色和用户名，在有效期内刷新浏览器会保持登录状态。

![image-20240318221414267](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318221414267.png)

![image-20240318221450806](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318221450806.png)

- 点击Add按钮，填写新用户表单，校验规则与注册相同。

![image-20240318223007509](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318223007509.png)

![image-20240318223244070](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318223244070.png)

后台数据库：

![image-20240318224113884](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224113884.png)

- 点击用户“test1”对应Edit操作，修改其角色为管理员。

![image-20240318223415568](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318223415568.png)

![image-20240318223626553](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318223626553.png)

![image-20240318223550236](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318223550236.png)

后台数据库：

![image-20240318224201146](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224201146.png)

- 点击用户“test1”对应Delete操作，删除用户“test1”

![image-20240318223847466](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318223847466.png)

后台数据库：

![image-20240318224240403](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224240403.png)

- 点击菜单栏退出登录按钮，确定后回到登录界面。

![image-20240318224400067](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224400067.png)

![image-20240318224457291](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224457291.png)

2.注册普通用户“Babu188”=>登录=>查看用户列表=>修改个人信息=>刷新界面（登录状态保持）

![image-20240318224559030](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224559030.png)

![image-20240318224653637](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224653637.png)

![image-20240318224835848](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224835848.png)

![image-20240318224855929](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318224855929.png)

后台数据库：

![image-20240318225441488](C:\Users\10585\AppData\Roaming\Typora\typora-user-images\image-20240318225441488.png)