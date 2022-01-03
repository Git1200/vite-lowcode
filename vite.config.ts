/*
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-27 14:25:21
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-31 17:28:32
 * @FilePath: \vite-lowcode\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { ConfigEnv,  } from 'vite';
import { resolve } from 'path'
import formatEnv from './env/format';
import website from './website';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default ({command, mode}: ConfigEnv) => {
  const root = process.cwd();
  const env = formatEnv(mode);
  console.log(env);
  return defineConfig({
    root,
    plugins: [vue(), vueJsx()],
    server: {
      port: 8080,
      host: '0.0.0.0',
      open: true, // 自动打开浏览器
      base: '/',
      // 开发代理
      proxy: {
        // 字符串简写写法
        // '/api': '',
        // 选项写法
        '/api': {
          target: 'http://1200.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 正则表达式写法
        '^/api/.*': {
          target: 'http://1200.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/sunny': {
          bypass: (req, res, options) => {
            console.log(options);
            res.end('sunny hhhhhh')
          }
        },
        '^/404/.*': {
          forward: 'http://1200.com/api',
          bypass: (req, res, options) => {
            return false
          }
        }
      }
    },
    envDir: pathResolve('env'),
    envPrefix: website.appCode
  })
}
