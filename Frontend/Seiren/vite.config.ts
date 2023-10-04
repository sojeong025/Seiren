import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: './',
  build: {
    minify: false
=======
  base: '/',
  build: {
    assetsDir: 'assets',
    minify: false,
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    // optimizeDeps를 비활성화하지 않고 사용합니다.
>>>>>>> 652105329397947faa1ca60a721eafe71d044e64
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
