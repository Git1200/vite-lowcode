/**
 * @format
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-24 16:19:46
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-24 17:10:11
 * @FilePath: \vite-lowcore\.eslintrc.js
 */

/**
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-24 13:48:23
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-24 14:34:43
 * @FilePath: \vite-lowcore\.elintrc.js
 */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // 定义ESLint的解析器
    // 定义文件继承的子规范
    extends: [
        'alloy', // 都需要
        'alloy/vue', // vue项目需要
        'alloy/typescript', // ts项目需要
        'plugin:prettier/recommended',
        'prettier', // 优先 prettier 中的样式规范
        'prettier/@typescript-eslint',
    ],
    plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
    env: {
        // 你的环境变量（包含多个预定义的全局变量）
        browser: true,
        node: true,
        es6: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser', // 解析 .ts 文件
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true,
        },
    },
    ignorePatterns: ['*.config.js'], // 过滤文件
    globals: {
        // 你的全局变量（设置为 false 表示它不允许被重新赋值）
        //
        // myGlobal: false
    },
    rules: {
        // 自定义你的规则
    },
}
