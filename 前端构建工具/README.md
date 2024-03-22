[TOC]

### 作业要求

做两个demo：1.react+webpack+less+typescript；2.vue+vite+less+typescript。

要求每个demo至少含有两个可以跳转的页面，使用合适的loader和plugin，并尝试自定义loader和plugin。



### Demo 1: React + Webpack + Less + TypeScript

**创建项目并安装依赖：**

```bash
npx create-react-app react-webpack-demo --template typescript
cd react-webpack-demo
npm install react-router-dom
npm install webpack webpack-cli webpack-dev-server --save-dev
npm install ts-loader style-loader css-loader postcss-loader less-loader file-loader --save-dev
npm install html-webpack-plugin terser-webpack-plugin mini-css-extract-plugin clean-webpack-plugin speed-measure-webpack-plugin webpack-bundle-analyzer --save-dev
```

**在package.json中配置命令脚本：**

```
"scripts": {
	"build": "webpack --config webpack.config.js",
	"dev": "webpack-dev-server --config webpack.config.js --open"
},
```

**运行前端构建工具：**

```bash
// 在开发模式下运行 mode: "development"
npm run dev
// 在生产模式下运行 mode: "production"
npm run build
```

#### 项目结构（react-webpack-demo）

- dist-运行npm run build之后的项目导出目录
- public
  - index.html
- src
  - pages-两个页面组件
    - Home.tsx
    - Babu.tsx
  - App.less-样式文件
  - App.tsx-根组件，主要包含页面路由窗口视图、页面跳转链接
  - index.tsx-挂载根节点到index.html
  - logo.svg、babu.svg
  - myRoutes.tsx-自定义路由配置
- **my-copyright-plugin.js-自定义plugin**
- **my-less-loader.js-自定义loader**
- package.json-前端文件的依赖项、命令行脚本定义
- tsconfig.json-TypeScript 编译器的配置文件
- **webpack.config.js-用于配置 Webpack 的 JavaScript 文件，指定项目的入口文件、输出文件、加载器、插件等**

#### 界面示例

用Chrome浏览器打开react-webpack-demo/dist/index.html即可。

实现了Home Page和Babu Page之间的跳转，以及图标的简单动画效果。

<img src="example\image-20240321213724929.png"/>

<img src="example\image-20240321213748239.png"/>

**使用的Loader：**

1. **my-less-loader**：（自定义loader）
   - 将Less代码转换为CSS代码，然后将CSS代码传递给Webpack进行后续处理。
2. **css-loader**：
   - 解析CSS文件中的`@import`和`url()`等语法，以及处理CSS中的各种样式。
3. **style-loader**：
   - 将CSS代码通过`<style>`标签插入到HTML的`<head>`标签中。
4. **ts-loader**：
   - 加载和解析TypeScript文件，将其编译为可在浏览器中运行的JavaScript代码。
5. **file-loader**：
   - 用于处理文件依赖，例如图片、字体等，将其复制到输出目录，并返回文件路径。

**使用的Plugin：**

1. **my-copyright-plugin**：（自定义plugin）
   - 在 webpack 构建过程中注册了一个 `emit` 钩子的监听器。当 webpack 在生成最终的文件列表（即输出文件）时，该监听器被触发，然后插件会向输出文件列表中添加一个名为 `copyright.txt` 的文件，并包含指定的版权声明内容。
2. **html-webpack-plugin**：
   - 用于生成HTML文件，并将Webpack打包后的资源自动注入到HTML中。
3. **terser-webpack-plugin**：
   - 用于压缩JavaScript代码，基于Terser进行代码压缩和优化。
4. **mini-css-extract-plugin**：
   - 用于将CSS提取为独立的文件，而不是将其嵌入到JavaScript中。
5. **clean-webpack-plugin**：
   - 用于在每次构建前删除输出目录中的旧文件。
6. **speed-measure-webpack-plugin**：
   - 用于测量Webpack各个插件和Loader的执行时间，从而帮助优化构建性能。
7. **webpack-bundle-analyzer**：
   - 用于分析Webpack打包后的bundle大小和依赖关系，有助于优化打包结果，减小bundle大小，提高页面加载性能。

**输出信息：**

<img src="example\image-20240320230307099.png"/>

<img src="example\image-20240320230413070.png"/>

<img src="example\image-20240320230444647.png"/>



### Demo 2: Vue + Vite + Less + TypeScript

**创建项目并安装依赖：**

```bash
npm init vite@latest vue-vite-demo --template vue-ts
cd vue-vite-demo
npm install
npm install vue-router@4.0.1 less less-loader element-plus vuex@next vite-plugin-progress vue-loader @vue/cli-plugin-typescript vue @vue/compiler-sfc --save-dev
```

**运行前端构建工具：**

```bash
npm run dev
npm run build
```

#### 遇到的问题&解决方案

问题：运行npm run build之后页面空白，检查发现控制台报错：“Access to CSS stylesheet at 'file:///D:/assets/index-BP0bkA_V.css' from origin 'null' has been blocked by CORS”

原因：这个错误是由于浏览器的安全策略引起的，即浏览器不允许跨域请求加载本地文件系统中的资源。在开发过程中，通常不会出现这个问题，因为开发服务器会提供文件并允许跨域请求。但在生产环境中，如果试图直接通过 file:// 协议打开 HTML 文件，则可能会遇到这个问题。

解决方法：使用一个基于 HTTP 的服务器来提供我的网页，通过简单的 Node.js 服务器来实现。

```
mkdir server
cd server
npm init
npm install express path
```

```js
// server/server.js
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

运行npm run build之后，将生成的dist目录下的文件（assets、index.html）移至server目录下，然后运行node server.js即可。

#### 项目结构（vue-vite-demo）

- dist-运行npm run build之后的项目导出目录
- server
  - assets、index.html-从dist移过来的
  - package.json-服务器依赖项
  - server.js
- src
  - assets
    - img-图标文件
    - style.less-样式文件
  - components-两个页面组件
    - Home.vue
    - Babu.vue
  - router
    - index.js--自定义路由配置
  - store-一些不重要的尝试
  - App.vue-根组件，主要包含页面路由窗口视图、页面跳转链接
  - main.ts-挂载根节点到index.html
- index.html
- package.json-前端文件的依赖项、命令行脚本定义
- tsconfig.json-TypeScript 编译器的配置文件
- **vite-plugin-template.ts-自定义插件**
- **vite.config.ts-Vite 项目的配置文件，用于配置 Vite 构建工具的各种选项**

#### 界面示例

在server路径下运行node server.js即可在http://localhost:3000/展示页面。

实现了Home Page和Babu Page之间的跳转，以及图标的简单动画效果。（当将浏览器外观设置为浅色/深色时，页面字体颜色也会发生改变）

<img src="example\image-20240321223628665.png"/>

浅色：

<img src="example\image-20240321223813893.png"/>

<img src="example\image-20240321223835892.png"/>

深色：

<img src="example\image-20240321223922206.png"/>

<img src="example\image-20240321223900549.png"/>

**使用的Plugin：**

1. **vite-plugin-template**：（自定义plugin）
   - 在不同的生命周期钩子中执行特定的打印任务。
2. **vite-plugin-progress**：
   - 显示项目构建进度。

<img src="example\image-20240321232439845.png"/>