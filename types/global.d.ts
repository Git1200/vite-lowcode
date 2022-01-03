/*
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-28 19:42:03
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-28 20:24:42
 * @FilePath: \vite-lowcode\src\types\global.d.ts
 */
declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };
 type Recordable<T = any> = Record<string, T>;
}
export {}