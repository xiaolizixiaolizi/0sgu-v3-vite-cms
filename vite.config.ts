import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 给组件命名<script lang="ts" setup name="App"> </script>
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  //mode就是package脚本里面--mode后面自定义环境变量 development|test|production
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        watchFiles: true,
        localEnabled: command === 'serve' && mode === 'mock', // 是否启用 mock 功能
      }),
    ],

    build: {
      chunkSizeWarningLimit: 1000,
      outDir: 'dist', //输出打包目录
      cssCodeSplit: true,
      sourcemap: mode === 'development', //开发环境产生soucemap
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash:8].js',
          entryFileNames: 'assets/js/[name]-[hash:8].js',
          assetFileNames: ({ name }) => {
            const [n, ext] = path.basename(name).split('.')
            if (/(png|jpe?g|gif)$/.test(ext))
              return 'assets/images/[name]-[hash].[ext]'
            if (/(woff|woff2|eot|ttf|otf)$/.test(ext))
              return 'assets/fonts/[name]-[hash].[ext]'
            if (/(mp4|mov|mpe?g|flv|avi)$/.test(ext))
              return 'assets/videos/[name]-[hash].[ext]'
            if (/(mp3|aac|ogg|flv|wav)$/.test(ext))
              return 'assets/audios/[name]-[hash].[ext]'
            return 'assets/[ext]/[name]-[hash].[ext]'
          },
          //manualChunks 把lodash-es和element-plus单独打包输出js文件
          manualChunks: {
            'lodash-es': ['lodash-es'],
            'element-plus': ['element-plus'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },

    server: {
      proxy: {
        '/mock-dev-api': {
          target: 'http://127.0.0.1:5173',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock-dev-api/, ''),
        },
      },
    },
  }
})
