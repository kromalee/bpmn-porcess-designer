import MyProcessDesigner from "./designer";
import MyProcessPalette from "./palette";
import MyProcessPenal from "./penal";
import MyProcessDesignerFull from "./designer-full";
import "./theme/index.scss"

const components = [
  MyProcessDesigner,
  MyProcessPenal,
  MyProcessPalette,
  MyProcessDesignerFull,
];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.0.1",
  install,
  ...components,
};
