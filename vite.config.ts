import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
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
  }
})
