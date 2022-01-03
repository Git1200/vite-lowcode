/*
 * @Descripttion: 说明
 * @version: v1.0.0
 * @Author: kml <1053182739@qq.com>
 * @Date: 2021-12-28 13:55:29
 * @LastEditors: kml <1053182739@qq.com>
 * @LastEditTime: 2021-12-31 17:47:01
 * @FilePath: \vite-lowcode\env\env.d.ts
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_PORT: Number,
  readonly APP_GLOB_TITLE: String,
  readonly APP_GLOB_SHORT_NAME: String,
  readonly APP_MOCK: Boolean,
  readonly APP_PUBLIC_PATH: String,
  readonly APP_GLOB_API_URL: String,
  readonly APP_GLOB_UPLOAD_URL: String,
  readonly APP_GLOB_API_URL_PREFIX?: String,
  readonly APP_PROXY: Array<[]>,
  readonly APP_DROP_CONSOLE: Boolean,
  readonly APP_BUILD_COMPRESS: Boolean,
  readonly APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE: Boolean,
  readonly APP_USE_IMAGEMIN: Boolean,
  readonly APP_USE_PWA: Boolean,
  readonly APP_LEGACY: Boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}