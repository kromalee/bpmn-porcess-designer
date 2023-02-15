import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
// import requireTransform from "vite-plugin-require-transform";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    //  dev 需要打开这个选项
    // requireTransform({
    //   fileRegex: /.js$/,
    // }),
  ],
  build: {
    target: ["es2015"],
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.join(__dirname, "package/index.js"),
      formats: ["umd"],
      name: "BpmnPorcess",
      // the proper extensions will be added
      fileName: (format) => `bpmn-process.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
});
