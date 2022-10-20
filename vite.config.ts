import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imports from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [vue(), imports({ dts: true, imports: ['vue'], eslintrc: { enabled: true } })]
});
