import Vue from "vue";
import App from "./App.vue";


// 加载基础ElementUI
import ElementUI from "element-ui";
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';


import MyPD from "../package/index.js";
Vue.use(MyPD);



// import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; // 右边工具栏样式

new Vue({
  render: h => h(App)
}).$mount("#app");
