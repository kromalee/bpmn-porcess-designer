import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import requireTransform from "vite-plugin-require-transform";
import path from "path";

export default defineConfig((command, mode, ssrBuild) => {
  if (command === "serve") {
    return {
      plugins: [
        vue(),
        //  dev 需要打开这个选项
        requireTransform({
          fileRegex: /.js$/,
        }),
      ],
      resolve: {
        extensions: [".js", ".vue"],
      },
    };
  } else {
    command === 'build'
    return {
      plugins: [vue()],
      build: {
        outDir:'E:\\kromalee\\togest-assm-front-scbzb/src/main/resources/static/plugs/bpmn-process',
        target: ["es2015"],
        lib: {
        
          entry: path.join(__dirname, "package/index.js"),
          formats: ["umd"],
          name: "BpmnProcess",
          fileName: (format) => `bpmn-process.${format}.js`,

        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue",
            },
          },
        },
      },
      resolve: {
        extensions: [".js", ".vue"],
      },
    };
  }

  return {};
});
