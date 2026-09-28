export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-less'], // 使用标准 CSS 与 Less 推荐规则
  customSyntax: 'postcss-less', // 让 Stylelint 能解析 Less 语法
}
