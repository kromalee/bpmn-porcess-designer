import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import requireTransform from "vite-plugin-require-transform";

export default defineConfig({
  plugins: [
    vue(),
    requireTransform({
      fileRegex: /.js$/,
    }),
  ],
  // build: {
  //   lib: {
  //     // Could also be a dictionary or array of multiple entry points
  //     entry: resolve(__dirname, "package/index.js"),
  //     name: "BpmnPorcess",
  //     // the proper extensions will be added
  //     fileName: "bpmn-process",
  //   },
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖
  //     external: ["vue"],
  //     output: {
  //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //       globals: {
  //         vue: "vue",
  //       },
  //     },
  //   },
  // },
  resolve: {
    extensions: [".js", ".vue"],
  },
});
