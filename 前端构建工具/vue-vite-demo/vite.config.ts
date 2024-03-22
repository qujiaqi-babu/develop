import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginTemplate from './vite-plugin-template'
import progress from 'vite-plugin-progress'
import { resolve } from 'path'

// 代码补全工具 defineConfig
export default defineConfig({
  mode: 'development',
  define:{
    __APP_VERSION__: JSON.stringify(require('./package.json').version),
    __API_URL__: JSON.stringify(process.env.API_URL)
  },
  plugins: [
    vue(),
    vitePluginTemplate(),
    progress() // 显示项目构建进度
  ],
  server: {
    port: 8000,
    open: true,
    cors: true,
  },
})