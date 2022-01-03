/*
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-28 21:01:54
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-31 17:58:26
 * @FilePath: \vite-lowcode\env\format.ts
 */
import { loadEnv } from 'vite';
import { resolve } from 'path';
import website from '../website';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
export default function (mode:string): ImportMeta {
  // loadEnv vite 的方法
  const tempEnv = loadEnv(mode, pathResolve('env'), website.appCode);
  const env: any = {};

  for (const key of Object.keys(tempEnv)) {
    let realName:any = tempEnv[key].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (!isNaN(+realName)) {
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
  website.env = env;
  return env;
}