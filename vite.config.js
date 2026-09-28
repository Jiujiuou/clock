import { dirname, resolve } from 'node:path' // 用于拼出绝对目录路径
import { fileURLToPath } from 'node:url' // 将当前模块 URL 转为文件路径
import { defineConfig } from 'vite' // 提供 Vite 配置提示
import react from '@vitejs/plugin-react' // 启用 React 与 JSX 支持

export default defineConfig({
  // 导出 Vite 配置
  plugins: [react()], // 启用 React 插件
  resolve: {
    // 配置模块解析规则
    alias: {
      // 配置导入路径别名
      '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'), // 将 @ 指向项目 src 目录
    },
  },
})
