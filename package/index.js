import MyProcessDesignerFull from "./designer-full";
import "./theme/index.scss"

const components = {MyProcessDesignerFull}

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
  MyProcessDesignerFull:MyProcessDesignerFull
};
