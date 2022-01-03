# [环境变量](https://vitejs.cn/guide/env-and-mode.html)
1. Vite 在一个特殊的 `import.meta.env` 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：
+ import.meta.env.MODE: {string} 应用运行的模式。
+ import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
+ import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
+ import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
## [.env](https://vitejs.cn/guide/env-and-mode.html#env-files) 文件
在真实开发过程中，可能涉及不少调试环境。为此在根目录下新建一个`env`文件统一管理环境变量。
```sh
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```
默认只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这个文件中：
```sh
DB_PASSWORD=foobar
VITE_SOME_KEY=123
```
只有 VITE_SOME_KEY 会被暴露为 import.meta.env.VITE_SOME_KEY 提供给客户端源码，而 DB_PASSWORD 则不会。

## 模式 [mode](https://vitejs.cn/guide/env-and-mode.html#modes)
默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式，而 build 以及 serve 命令则运行在 production (生产) 模式。
这意味着当执行 vite build 时，它会自动加载 .env.production 中可能存在的环境变量：
```sh
# .env.production
VITE_APP_TITLE=My App
```
在你的应用中，你可以使用 `import.meta.env.VITE_APP_TITLE` 渲染标题。
可以通过传递 --mode 选项标志来覆盖命令使用的默认模式。
新建 “staging” (预发布|预上线) 模式：
+ 在`package.json`文件中新增脚本命令
  ```sh
  vite build --mode staging
  ```
+ 在 `src/env` 新建 `.env.staging` 文件
  ```sh
  # .env.staging
  NODE_ENV=production
  VITE_APP_TITLE=My App (staging)
  ```
  现在，你的 staging 应用应该具有类似于生产的行为，但显示的标题与生产环境不同。

## TypeScript 的智能提示
默认情况下，Vite 在 `vite/client.d.ts` 中为 `import.meta.env` 提供了类型定义。随着在 `.env[mode]` 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 VITE_ 为前缀的用户自定义环境变量的 TypeScript 智能提示。  

要想做到这一点，你可以在 `src/env` 目录下创建一个` env.d.ts` 文件，接着按下面这样增加 `ImportMetaEnv` 的定义：
```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 自定义 env 变量的前缀 [envPrefix](https://vitejs.cn/config/index.html#envprefix)
+ 类型： string | string[]
+ 默认： VITE_
```ts
// vite.config.ts
// ...
envPrefix: 'APP_'
// ...
```
以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。 

## [envDir](https://vitejs.cn/config/#envdir) <span style="margin-left: 12px"> .env 文件的目录地址  </span>
+ 类型： string
+ 默认： root
```ts
// vite.config.ts
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// ...
{
  "envDir": pathResolve('env')
}
// ...
```
用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。

## 通过导入 vite 中 loadEnv 解析环境变量文件
+ 在`env`目录下新建`format.ts`文件
  ```ts
  // format.ts
  import { loadEnv } from 'vite';
  import { resolve } from 'path';
  import website from '../website';
  function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
  }
  export default function (mode:string): ImportMeta {
    // loadEnv vite 的方法
    const tempEnv = loadEnv(mode, pathResolve('env'), website.appCode);
    const env: ImportMeta = {};
    for (const key of Object.keys(tempEnv)) {
      let realName:any = tempEnv[key].replace(/\\n/g, '\n');
      realName = realName === 'true' ? true : realName === 'false' ? false : realName;
      if (isNaN(+realName)) {
        realName = Number(realName);
      }
      if (key === 'APP_PROXY' && realName) {
        try {
          realName = JSON.parse(realName.replace(/'/g, '"'));
        } catch (error) {
          realName = '';
        }
      }
      env[key] = realName;
      if (typeof realName === 'string') {
        process.env[key] = realName;
      } else if (typeof realName === 'object') {
        process.env[key] = JSON.stringify(realName);
      }
    }
    website.env = env; // 将环境变量存储的项目配置文件，方便使用
    return env;
  }
  ```
  

> 安全注意事项
> + .env.*.local 文件应是本地的，可以包含敏感变量。你应该将 .local 添加到你的 .gitignore 中，以避免它们被 git 检入。
> + 由于任何暴露给 Vite 源码的变量最终都将出现在客户端包中，VITE_* 变量应该不包含任何敏感信息。
> + envPrefix 不应被设置为空字符串 ''，这将暴露你所有的环境变量，导致敏感信息的意外泄漏。 检测到配置为 '' 时 Vite 将会抛出错误.
> + 常用的变量配置：
> ```sh
>  # 是否启用MOCK
>  APP_MOCK = true
>  # public path
>  APP_PUBLIC_PATH = /
>  # 删除打印日志
>  APP_DEL_CONSOLE = true
>  # 是否开启 gzip/brotli 压缩
>  # 可选： gzip | brotli | none
>  # 开启多个用`,`隔开
>  APP_BUILD_COMPRESS = 'none'
>  # 使用压缩时是否删除原始文件，默认为false
>  APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE = false
>  # 基本接口地址
>  APP_GLOB_API_URL=/basic-api
>  ## 文件上传地址，可选
>  ## 可以通过nginx转发或直接写入实际地址。
>  # APP_GLOB_UPLOAD_URL=/upload
>  ## 接口前缀
>  # APP_GLOB_API_URL_PREFIX=
>  ## 是否启用图像压缩
>  # APP_USE_IMAGEMIN= true
>  ## use pwa
>  # APP_USE_PWA = false
>  ## 是否与旧版浏览器兼容
>  # APP_LEGACY = false
> ```
