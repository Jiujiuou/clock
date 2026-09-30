# 项目规则

## 技术与导入

- 使用 Vite、React 18、JSX 和 Less；禁止 TypeScript。
- 项目导入统一使用 `@/…`；禁止相对路径。
- ESLint 检查静态导入、重新导出和直接写明路径的动态加载；不要用变量拼接绕过规则。
- 添加或安装任何 npm 包前，先征求用户同意。
- 图标优先使用 `lucide-react`。
- 禁止在代码中硬编码字符串字面量；枚举值、配置值统一抽成常量对象（参照 `src/utils/time.js` 中 `TIME_UNIT`、`DIGIT_POSITION` 的写法）。
- 禁止在 JSX 中使用行内箭头函数作为事件处理；统一抽成具名 handler 函数，保持 DOM 结构可读。

## 目录

- 只有 `src/components/` 使用 `index.js` 做统一导入导出。
- `components/` 根目录只放 `index.js` 和组件文件夹。组件文件夹内放组件 JSX 与 `index.module.less`。
- 页面布局作为 `src/components/Layout/` 组件，目录内只放 `Layout.jsx` 和 `index.module.less`。
- `utils/`、`constants/`、`hooks/` 不加 `index.js`，按职责建文件。

## 界面与样式

- 样式使用 Less Modules，类名简短、清楚；不使用 BEM。
- 共用样式变量集中在 `src/styles/variables.less`，组件通过 `var(...)` 使用。
- 修改界面前先读 `DESIGN.MD`。
- 改造 UI 前先提供 ASCII 草图或图片，获用户同意后再改代码。
- 页面必须按单屏 Flex 布局，不出现滚动条；具体规范见 `DESIGN.MD`。

## 工具

- 使用 ESLint、Prettier、Stylelint 检查代码和 Less。
- 环境配置参照 `.env.example`，本地值放 `.env.local`；`VITE_` 变量仅放可公开的前端配置。
