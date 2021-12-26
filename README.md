<!--
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-21 17:21:04
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-24 20:27:54
 * @FilePath: \vite-lowcore\README.md
-->
# Vue 3 + Typescript + Vite
## TypeScript
+ TypeScript 编译器选项
```json
// tsconfig.json
{
  "compilerOptions": {
    // ..
    "isolatedModules": true,
    "types": ["vite/client"]
  },
  // ...
}
```
+ 客户端类型
  Vite 默认的类型定义是写给它的 Node.js API 的。要将其补充到一个 Vite 应用的客户端代码环境中，请添加一个 d.ts 声明文件：
  ```javascript
  /// <reference types="vite/client" />
  ```
  将 vite/client 添加到 tsconfig 中的 compilerOptions.types 下：
  ```json
    // tsconfig.json
    {
      "compilerOptions": {
        // ..
        "types": ["vite/client"]
      },
      // ...
    }
  ```
## Vue
+ Vue 3 单文件组件支持：@vitejs/plugin-vue
+ Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
  安装`@vitejs/plugin-vue-jsx`支持JSX/TSX
  ```sh
  npm i @vitejs/plugin-vue-jsx -D
  ```
  配置`vite.config.ts`
  ```js
  // vite.config.ts
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import vueJsx from '@vitejs/plugin-vue-jsx'
  export default defineConfig({
    plugins: [vue(), vueJsx()]
  })
  ```
+ [vue-router](https://next.router.vuejs.org/zh/) 
  ```sh
  npm i vue-router@4
  ```
+ [vuex](https://next.vuex.vuejs.org/zh/) 
  ```sh
  npm i vuex@next
  ```
## CSS
+ PostCSS 自定义配置
  PostCSS 常用插件:
  > [autoprefixer](https://github.com/postcss/autoprefixer) - 为 CSS 中的属性添加浏览器特定的前缀
  > [postcss-plugin-px2rem](https://github.com/pigcan/postcss-plugin-px2rem) - 移动端自适应插件

  ```js
  // postcss.config.js
  module.exports = {
    parser: 'sugarss',
    map: false,
    plugins: {
      'postcss-plugin': {} // postcss-plugin 插件名
    }
  }
  ```
+ CSS 预处理器
  ```sh
    # .scss and .sass
    npm install -D sass

    # .less
    npm install -D less

    # .styl and .stylus
    npm install -D stylus
   ```
## [Eslint](https://eslint.bootcss.com/) + [Prettier](https://prettier.io/docs/en/index.html) 
参考[由浅入深定制你的代码规范与检查](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496469&idx=1&sn=064cf5dbad02fe8bce96d0c3f9dc4ac3&source=41#wechat_redirect) / [从零构建前端 ESLint 工作流](https://mp.weixin.qq.com/s/fR5TD-ibsOffS9bo0l9iWA)
+ Eslint
  使用 AlloyTeam 的配置
  > 安转依赖：`npm i eslint babel-eslint eslint-config-alloy vue-eslint-parser eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin`

  > 其他技术栈相关依赖
  > ```sh
  > // Eslint
  > npm install --save-dev eslint babel-eslint eslint-config-alloy
  > // React
  > npm install --save-dev eslint babel-eslint eslint-plugin-react eslint-config-alloy
  > // Vue
  > npm install --save-dev eslint babel-eslint vue-eslint-parser eslint-plugin-vue eslint-config-alloy
  > // TypeScript
  > npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
  > // TypeScript React
  > npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy
  >```

  ```js
    // .elintrc.js
    module.exports = {
      parser: '@typescript-eslint/parser', // 定义ESLint的解析器
      // 定义文件继承的子规范
      extends: [
        'alloy', // 都需要
        'alloy/vue', //vue项目需要
        'alloy/react', //react项目需要
        'alloy/typescript', //ts项目需要
      ],
      plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
      env: {
        // 你的环境变量（包含多个预定义的全局变量）
        //
        // browser: true,
        // node: true,
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
        },
      },
      globals: {
        // 你的全局变量（设置为 false 表示它不允许被重新赋值）
        //
        // myGlobal: false
      },
      rules: {
        // 自定义你的规则
      }
    };
  ```
+ Pritter
  > 依赖安装
  > ```sh
  > npm i prettier eslint-config-prettier eslint-plugin-prettier -D
  > ```

  > 依赖说明：
  >  1. prettier：Prettier插件的核心代码。
  >  2. eslint-config-prettier：解决ESLint中的样式规范和Prettier中样式规范的冲突，以 Prettier 的样式规范为准，使 ESLint 中的样式规范自动失效。
  >  3. eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用。

  > 创建 .prettierrc 文件
  > ```js
  > // .prettierrc.js
  > module.exports =  {
  >   "printWidth": 120,
  >   "semi": false,
  >   "singleQuote": true,
  >   "trailingComma": "all",
  >   "bracketSpacing": false,
  >   "jsxBracketSameLine": true,
  >   "arrowParens": "avoid",
  >   "insertPragma": true,
  >   "tabWidth": 4,
  >   "useTabs": false  
  > };
  > ```

  > 修改 .eslintrc.js 文件，引入 Prettier
  > ```js 
  > // .elintrc.js
  > module.exports = {
  >   // ...
  >   extends: [
  >     'alloy', // 都需要
  >     'alloy/vue', //vue项目需要
  >     'plugin:prettier/recommended',
  >     'prettier', // 优先 prettier 中的样式规范
  >     'prettier/@typescript-eslint',
  >     // ...
  >   ],
  >   // ...
  > }
  > ```

## Git 代码预检
### 实现过程
1. 待提交的代码
2. git add 添加到暂存区
3. 执行 git commit（这时进行代码预检）
4. husky注册在git pre-commit的钩子调起 lint-staged
5. lint-staged 取得所有被提交的文件依次执行写好的任务
6. 如果有错误（没通过ESlint检查）则停止任务，等待下次commit，同时打印错误信息
7. 成功提交后，git push推送到远程库
### Git hook
git hook就是.git文件夹的hooks下的一些钩子函数，特定时机他们将被调用,前端可以用插件husky与pre-commit，来使钩子生效。
+ husky 注册 git hook
  > Requires Node >= 10 and Git >= 2.13.0.
  1. 安装 `husky`: `npm install husky --save-dev`
  2. 编辑 package.json 文件
  ```json
    // package.json
    {
      // ...
      "husky": {
        "hooks": {
          // 提交钩子 运行的命令 相当于 npm run eslint src/**/*.js
          "pre-commit": "eslint src/**/*.js",
          // push 钩子
          "pre-push": "yarn test:unit",
          // commit 信息钩子
          "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
        }
      },
      // ...
    }
  ```
  3. 尝试 git commit 提交，就会先执行eslint src/**/*.js，代码没有问题才会被真正提交
  4. 这样每次提交代码，eslint都会检查所有文件，如果报错过多，一定会崩溃
+ Commitlint 
  1. 安装依赖： `npm i @commitlint/config-conventional @commitlint/cli -D`
  2. 新增配置文件`.commitlintrc.js`
    ```js
    // .commitlintrc.js
    module.exports = {
      extends: ['@commitlint/config-conventional'],
      rules: {}
    };
    ```
  3. 提交规范
    > 提交格式
    >  ```sh
    >  git commit -m <type>[optional scope]: <description>
    >  ```
    > 1. type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？总结以下 11 种类型：
    >> build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
    >> update：更新某功能（不是 feat, 不是 fix）
    >> docs：文档更新
    >> feat：新增功能
    >> fix：bug 修复
    >> perf：性能优化
    >> refactor：重构代码(既没有新增功能，也没有修复 bug)
    >> style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
    >> test：新增测试用例或是更新现有测试
    >> revert：回滚某个更早之前的提交
    >> chore：构建过程或辅助工具的变动
    > 2. optional scope: 一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
    > 3. description: 一句话描述此次提交的主要内容，做到言简意赅。

    > 新增配置文件: `.commitlintrc.js`
    > ```js
    > module.exports = {
    >   extends: ['@commitlint/config-conventional'],
    >   rules: {
    >     'type-enum': [2, 'always', [
    >       'build', 'update', 'docs', 'feat', 'fix', 'perf', 'refactor', 'style', 'test', 'revert', 'chore' 
    >     ]],
    >     'type-case': [0],
    >     'type-empty': [0],
    >     'scope-empty': [0],
    >     'scope-case': [0],
    >     'subject-full-stop': [0, 'never'],
    >     'subject-case': [0, 'never'],
    >     'header-max-length': [0, 'always', 72]
    >   }
    > };
    > ```
+ lint-staged 只 Lint 改动代码
  > lint-staged requires Node.js version 10.13.0 or later.

  > v10.0.0 以后对原始暂存文件的任何新修改都将自动添加到提交中。如果您的任务>以前包含一个git add步骤，请删除此步骤，同时运行多个git操作通常会导致错误，详见 lint-staged
  1. 安装 `lint-staged`: `npm install lint-staged --save-dev`
  2. 新增 package.json 配置
  ```json
    // package.json
    {
      // ...
      "lint-staged": {
        "src/**/*.js": ["eslint --fix", "prettier --write"],
        "src/**/*.ts": ["eslint --fix", "prettier --write"],
      },
      // ...
    }
  ```