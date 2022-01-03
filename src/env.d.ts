/*
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-29 09:26:16
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-29 09:26:16
 * @FilePath: \vite-lowcode\src\env.d.ts
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
