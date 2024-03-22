const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MyCustomPlugin = require("./my-copyright-plugin"); // 自定义plugin
const smw = new SpeedMeasureWebpackPlugin(); // 各loader和plugin的耗时

module.exports = smw.wrap({
  // 入口：可以是字符串/数组/对象
  entry: "./src/index.tsx", // 单个入口文件，所以写一个字符串即可

  // mode: "development", // 开发模式
  mode: "production", // 生产模式

  // 出口：通常是一个对象，至少包含path和filename属性
  output: {
    path: path.resolve(__dirname, "dist"), // 打包后的目录，通常是绝对路径
    filename: "[name].[hash:8].js", // 打包后的文件名称
  },

  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    hot: true,
  },

  optimization: {
    usedExports: true, // 标记未被使用的代码
    minimize: true, // 压缩输出结果
    minimizer: [
      new TerserPlugin({ extractComments: false }), // 不生成LICENSE.txt文件
    ],
  },

  // 用于配置模块如何被解析
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, // 匹配 TypeScript 文件
        use: {
          loader: "ts-loader", // 使用 ts-loader 来处理 TypeScript 文件
          options: {
            compilerOptions: {
              noEmit: false, // 将 TypeScript 文件编译并输出到目标文件中
            },
          },
        },
        exclude: /node_modules/, // 排除 node_modules 目录
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // "less-loader"
          {
            loader: path.resolve(__dirname, "my-less-loader.js"),
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]", // 输出文件名
            outputPath: "images/", // 输出目录
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 生成HTML文件
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      // 将 CSS 样式提取到单独的文件中
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new CleanWebpackPlugin(), // 在打包之前尝试清除dist目录下的文件
    new BundleAnalyzerPlugin(), // 生成分析报告
    new MyCustomPlugin(), // 使用自定义 CopyRightPlugin
  ],
});
