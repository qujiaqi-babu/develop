import type { PluginOption } from "vite";
export default function (): PluginOption {
    return {
        // 插件名称
        name: "vite-plugin-template",
        // pre 会在所有其他插件之前执行
        enforce: "pre", // post
        // 指明它们仅在'build'或'serve'模式下运行
        apply: "build", // apply 亦可是一个函数
        // 在解析 Vite 配置前调用
        config(config, { command }) {
            console.log('这里是config钩子');
            // console.log(command);
        },
        // 在解析 Vite 配置后调用
        configResolved(config) {
            console.log('这里是configResolved钩子');
            // console.log(config);
        },
        // 用于配置开发服务器，在内部中间件被安装前调用
        configureServer(server) {
            console.log('这里是configureServer钩子');
            // console.log(server);
        },
        // 转换 indext.html 的专用钩子，钩子接收当前的 HTML 字符串和转换上下文
        transformIndexHtml(html) {
            console.log('这里是transformIndexHtml钩子');
            // console.log(html);
        }
    }
}