class CopyRightPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("CopyRightPlugin", (compilation, callback) => {
      // 在生成文件列表之前执行一些操作
      compilation.assets["copyright.txt"] = {
        source: function () {
          return "Copyright (c) 2024/3/20 瞿佳琪"; // 文件内容
        },
        size: function () {
          return 20; // 文件大小
        },
      };
      callback();
    });
  }
}

module.exports = CopyRightPlugin;
