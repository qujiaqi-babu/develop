### 作业要求

参考演示项目，完善不足之处，做一个自己的taro-todolist，无论是从样式上还是功能上要有自己的想法，实现上最好也要有自己的思路。要求：

1.实现演示项目中的所有基础功能

2.给所有的todo项设置优先级，并可以按照优先级筛选排序

3.针对平台环境不同，交互上做出差异区分

4.样式美化

5.保证h5、微信小程序双端能够跑起来

### 环境配置

1、安装taro，配置系统环境变量，创建跨端todolist应用taro-todolist

```
npm install -g @tarojs/cli
- 在电脑中找到含有taro.cmd文件的目录，将路径复制到电脑“属性”=>“高级系统设置”=>“环境变量”=>在系统变量栏=>path新建
- 以管理员身份运行powerShell，输入：Set-ExecutionPolicy RemoteSigned
taro init taro-todolist
cd taro-todolist
```

2、安装微信小程序平台插件

```
npm install @tarojs/plugin-platform-weapp
```

3、启动微信小程序/H5

```
npm run dev:weapp
npm run dev:h5
```

### 项目结构

- src
  - app.config.js-路由配置
  - app.js-应用入口
  - pages/todolist
    - index.config.js-默认页面配置
    - todolist.js-页面入口与备忘录功能实现
    - todolist.css-样式

- example-微信小程序/H5界面示例

### 新增的功能

1.显示当天的日期、星期

2.当修改待办项优先级时，自动按优先级排序，并根据待办项优先级显示不同颜色

3.当待办项已完成时修改待办项样式，更符合用户使用习惯

4.微信小程序端显示额外的“转发给好友”按钮

### 微信小程序界面示例

<img src="example\微信小程序界面.png" alt="微信小程序界面" />

### H5界面示例

<img src="example\H5界面.png" alt="H5界面" />
