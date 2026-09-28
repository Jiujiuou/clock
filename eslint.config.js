import reactHooks from 'eslint-plugin-react-hooks' // React Hooks 规则
import reactRefresh from 'eslint-plugin-react-refresh' // Vite 热更新规则
import globals from 'globals' // 浏览器和 Node 全局变量定义

export default [
  // ESLint 扁平配置列表
  {
    ignores: ['dist/**', 'node_modules/**'], // 忽略构建产物和依赖
  },
  {
    files: ['**/*.{js,jsx}'], // 检查 JavaScript 和 JSX 文件
    languageOptions: {
      // 指定 JavaScript 解析与全局环境
      ecmaVersion: 'latest', // 使用最新 ECMAScript 语法
      sourceType: 'module', // 按 ES Module 解析
      globals: {
        // 注册运行环境自带的全局变量
        ...globals.browser, // 浏览器 API，例如 window
        ...globals.node, // Node.js API，例如 process
      },
      parserOptions: {
        // 配置语法解析器
        ecmaFeatures: { jsx: true }, // 启用 JSX 语法
      },
    },
    plugins: {
      // 注册 ESLint 插件
      'react-hooks': reactHooks, // 检查 Hooks 使用规则
      'react-refresh': reactRefresh, // 检查热更新兼容的导出
    },
    rules: {
      // 项目实际启用的检查规则
      ...reactHooks.configs.flat.recommended.rules, // 使用官方推荐的 Hooks 规则
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // 提示不适合热更新的导出
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 禁止未使用变量，以下划线开头的参数除外
      'no-undef': 'error', // 报错未声明的变量
      'no-restricted-imports': [
        'error', // 相对路径导入或重新导出直接报错
        {
          patterns: [
            {
              group: ['.', '..', './**', '../**'], // 禁止当前目录及父级目录路径
              message: '项目内导入和导出请使用 @/ 别名，禁止相对路径。',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error', // 同时限制动态加载，避免绕过静态导入规则
        {
          selector: 'ImportExpression[source.value=/^[.]/]', // 检查 import() 的字符串路径
          message: '动态导入请使用 @/ 别名，禁止相对路径。',
        },
        {
          selector:
            'ImportExpression > TemplateLiteral > TemplateElement:first-child[value.raw=/^[.]/]', // 检查模板字符串开头
          message: '动态导入请使用 @/ 别名，禁止相对路径。',
        },
        {
          selector: 'CallExpression[callee.name="require"] > Literal.arguments[value=/^[.]/]', // 检查 require() 的字符串路径
          message: '项目内加载请使用 @/ 别名，禁止相对路径。',
        },
      ],
    },
  },
]
