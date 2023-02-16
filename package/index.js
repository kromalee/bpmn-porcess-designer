import MyProcessDesignerFull from "./designer-full";
import MyProcessViewerFull from "./viewer-full";
import "./theme/index.scss";

const components = { MyProcessDesignerFull, MyProcessViewerFull };

const install = function (Vue) {
  Vue.component(MyProcessDesignerFull.name, MyProcessDesignerFull);
  Vue.component(MyProcessViewerFull.name, MyProcessViewerFull);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "1.0.0",
  install,
  MyProcessDesignerFull: MyProcessDesignerFull,
  MyProcessViewerFull: MyProcessViewerFull,
};
