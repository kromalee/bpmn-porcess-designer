import MyProcessViewerFull from "./ProcessViewerFull.vue";

MyProcessViewerFull.install = function (Vue) {
  Vue.component(MyProcessViewerFull.name, MyProcessViewerFull);
};
MyProcessViewerFull.component = MyProcessViewerFull;

export default MyProcessViewerFull;
