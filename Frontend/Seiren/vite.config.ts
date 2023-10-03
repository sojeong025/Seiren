import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    minify: 'terser', // Terser를 사용하여 코드를 최소화합니다.
    rollupOptions: {
      // 기타 Rollup 옵션을 설정합니다.
      // 필요한 경우 코드 스플리팅 등을 활성화할 수 있습니다.
    },
  },
  optimizeDeps: {
    // optimizeDeps를 비활성화하지 않고 사용합니다.
  },
  define: {
    'global' : {},
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
    ]
  }
})
