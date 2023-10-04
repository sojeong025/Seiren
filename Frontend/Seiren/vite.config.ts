import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
<<<<<<< HEAD
    // optimizeDeps를 비활성화하지 않고 사용합니다.
=======
    // optimizeDeps를 비활성화하지 않고 사용합니다. test
>>>>>>> 32f6ea9615902fd5d0c4890255cd0e6fa73fc634
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
