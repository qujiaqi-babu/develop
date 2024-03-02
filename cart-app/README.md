### 作业要求

扩展实践的购物车应用。应用应包含以下功能:
1、商品列表：显示可购买的商品列表。每个商品都应该有名称、价格和“添加到购物车”按钮。
2、购物车：用户可以查看他们的购物车，购物车应显示用户已添加的商品、每个商品的数量、单个商品的价格和购物车的总价。用户应能够增加或减少购物车中商品的数量，或者从购物车中完全移除商品。
3、结账：用户可以进行结账操作，结账后购物车应清空。

备注:
1、商品列表可以通过 fetch 走本地 json 数据
2、样式自定义

### 环境配置

1、简易沙盒环境 Expo，创建购物车应用 cart-app，运行
npx create-expo-app cart-app
cd cart-app
npm start

2、安装 Web 依赖
npx expo install react-native-web react-dom @expo/metro-runtime

3、使用官方推荐的导航库 React Navigation
npm install @react-navigation/native @react-navigation/native-stack

### 项目结构

- asserts-存放静态资源文件（如商品图片）
- component-自定义组件
  - Product-购物车应用
    - index.js-购物车组件入口
    - productionInfo.js-本地json格式商品数据
    - ProductList.js-商品/购物车列表展示
    - ProductItem.js-商品展示项
    - CartItem.js-购物车商品项
  - home.js-主界面
- example-界面流程示例图
- App.js-导航栏页面声明

### 界面流程图

<img src="example\购物车-界面流程图.jpg" alt="购物车-界面流程图" />
