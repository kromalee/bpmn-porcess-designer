<template>
  <div class="my-app">
    <my-process-designer :key="`designer-${reloadIndex}`" :options="{
      taskResizingEnabled: true,
      eventResizingEnabled: true,
      minimap: {
        open: true
      }
    }" :value="xmlString" v-bind="controlForm" keyboard ref="processDesigner" @element-click="elementClick"
      @element-contextmenu="elementContextmenu" @init-finished="initModeler">
    </my-process-designer>
    <MyProcessPenal :key="`penal-${reloadIndex}`" :bpmn-modeler="modeler" :prefix="controlForm.prefix"
      class="process-panel" />

  </div>
</template>

<script>
import translations from "./translations";
// 自定义渲染（隐藏了 label 标签）
import CustomRenderer from "./modules/custom-renderer";
// 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
import CustomContentPadProvider from "../designer/plugins/content-pad";
// 自定义左侧菜单（修改 默认任务 为 用户任务）
import CustomPaletteProvider from "../designer/plugins/palette";
import Log from "../Log";
// // 任务resize
// import resizeTask from "bpmn-js-task-resize/lib";
// // bpmn theme plugin
// import sketchyRendererModule from "bpmn-js-sketchy";
// 小地图
import minimapModule from "diagram-js-minimap";

// import UserSql from "./modules/extension/user.json";

// clickoutside
import clickoutside from "element-ui/lib/utils/clickoutside";
import RewriteAutoPlace from "./modules/auto-place/rewriteAutoPlace";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";

import MyProcessDesigner from "../designer";
import MyProcessPenal from "../penal";

import DirectedGraph from 'graphology';
import hasCycle from 'graphology-dag/has-cycle';
import { topologicalSort } from 'graphology-dag/topological-sort'
import { isObject, isArray, sortBy } from "lodash";

export default {
  components: {
    MyProcessDesigner, MyProcessPenal
  },
  name: "MyProcessDesignerFull",
  props: {
    xmlString: {
      type: String
    }
  },
  directives: {
    clickoutside: clickoutside
  },
  data() {
    return {
      modeler: null,
      reloadIndex: 0,
      controlDrawerVisible: false,
      infoTipVisible: false,
      pageMode: false,
      translationsSelf: translations,
      controlForm: {
        processId: "",
        processName: "",
        simulation: true,
        labelEditing: false,
        labelVisible: false,
        prefix: "flowable",
        headerButtonSize: "mini",
        events: ["element.click", "element.contextmenu"],
        // additionalModel: []
        // moddleExtension: { user: UserSql },
        additionalModel: [
          CustomContentPadProvider,
          CustomPaletteProvider,
          minimapModule,
          {
            __init__: ["autoPlaceSelectionBehavior"],
            autoPlace: ["type", RewriteAutoPlace]
          }
        ]
      },
      addis: {
        CustomContentPadProvider,
        CustomPaletteProvider
      }
    };
  },
  created() {
  },
  methods: {
    getXMLData: function () {
      return this.$refs['processDesigner'].getXMLData()
    },
    getJSONData: function () {


      return this.$refs['processDesigner'].getJSONData()
        .then((data) => {
          var srcData = data.process
          // 拓扑排序处理
          var nodes = (srcData.startEvent ? [srcData.startEvent] : [])
            .concat(srcData.userTask)
            .concat(srcData.endEvent ? [srcData.endEvent] : [])
            .concat(srcData.exclusiveGateway && (!isArray(srcData.exclusiveGateway)) ? [srcData.exclusiveGateway] : [])
            .concat(isArray(srcData.exclusiveGateway) ? srcData.exclusiveGateway : [])
          var userTask = srcData.userTask

          const graph = DirectedGraph.from({
            nodes: nodes.map((obj) => {
              return { key: obj._id }
            }),
            edges: srcData.sequenceFlow.map((obj) => {
              return {
                key: obj._id,
                source: obj._sourceRef,
                target: obj._targetRef,
              }
            })
          });
          var sortList = []
          //判断有无环
          //如果无环就正常拓扑排序
          //如果有环放弃使用拓扑排序
          if (hasCycle(graph)) {
            console.error('图中存在环，无法进行拓扑排序，将使用默认的顺序!');

          } else {
            sortList = topologicalSort(graph)
            console.log(sortList)
            userTask = sortBy(userTask, (obj) => {
              return sortList.indexOf(obj._id)
            })
          }

          return {
            process: {
              startEvent: srcData.startEvent,
              userTask: userTask,
              exclusiveGateway: srcData.exclusiveGateway,
              endEvent: srcData.endEvent,
              sequenceFlow: srcData.sequenceFlow
            }
          }
        })


    },
    initModeler(modeler) {
      setTimeout(() => {
        this.modeler = modeler;
        const canvas = modeler.get("canvas");

        const rootElement = canvas.getRootElement();
        Log.prettyPrimary("Process Id:", rootElement.id);
        Log.prettyPrimary("Process Name:", rootElement.businessObject.name);
      }, 10);
    },
    // reloadProcessDesigner(notDeep) {
    //   this.controlForm.additionalModel = [];
    //   for (let key in this.addis) {
    //     if (this.addis[key]) {
    //       this.controlForm.additionalModel.push(this.addis[key]);
    //     }
    //   }
    //   !notDeep && (this.xmlString = undefined);
    //   this.reloadIndex += 1;
    //   this.modeler = null; // 避免 panel 异常
    // },
    // changeLabelEditingStatus(status) {
    //   this.addis.labelEditing = status ? { labelEditingProvider: ["value", ""] } : false;
    //   this.reloadProcessDesigner();
    // },
    // changeLabelVisibleStatus(status) {
    //   this.addis.customRenderer = status ? CustomRenderer : false;
    //   this.reloadProcessDesigner();
    // },
    elementClick(element) {
      console.log(element);
      this.element = element;
    },
    elementContextmenu(element) {
      console.log("elementContextmenu:", element);
    },
    // changePageMode(mode) {
    //   const theme = mode
    //     ? {
    //         // dark
    //         stroke: "#ffffff",
    //         fill: "#333333"
    //       }
    //     : {
    //         // light
    //         stroke: "#000000",
    //         fill: "#ffffff"
    //       };
    //   const elements = this.modeler.get("elementRegistry").getAll();
    //   this.modeler.get("modeling").setColor(elements, theme);
    // },
    // toggle() {
    //   console.log(this.modeler);
    //   console.log(this.modeler.get("toggleMode"));
    //   this.modeler.get("toggleMode").toggleMode();
    // }
  }
};
</script>

<style lang="scss" scoped>
.my-app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: inline-grid;
  grid-template-columns: auto max-content;
}

.demo-info-bar {
  position: fixed;
  right: 8px;
  bottom: 108px;
  z-index: 1;
}

.demo-control-bar {
  position: fixed;
  right: 8px;
  bottom: 48px;
  z-index: 1;
}

.open-model-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 32px;
  background: rgba(64, 158, 255, 1);
  color: #ffffff;
  cursor: pointer;
}

.zoom-in-right-enter-active,
.zoom-in-right-leave-active {
  opacity: 1;
  transform: scaleY(1) translateY(-48px);
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: right center;
}

.zoom-in-right-enter,
.zoom-in-right-leave-active {
  opacity: 0;
  transform: scaleX(0) translateY(-48px);
}

.info-tip {
  position: absolute;
  width: 480px;
  top: 0;
  right: 64px;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 16px;
  color: #333333;
  background: #f2f6fc;
  transform: translateY(-48px);
  border: 1px solid #ebeef5;
  border-radius: 4px;

  &::before,
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: solid;
    position: absolute;
    right: -15px;
    top: 50%;
  }

  &::before {
    border-color: transparent transparent transparent #f2f6fc;
    z-index: 10;
  }

  &::after {
    right: -16px;
    border-color: transparent transparent transparent #ebeef5;
    z-index: 1;
  }
}

.control-form {
  .el-radio {
    width: 100%;
    line-height: 32px;
  }
}

.element-overlays {
  box-sizing: border-box;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: #fafafa;
}
</style>
