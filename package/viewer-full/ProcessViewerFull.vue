<template>
    <div class="my-process-designer my-process-viewer">
        <div class="my-process-designer__container">
            <div class="my-process-designer__canvas" ref="bpmn-canvas"></div>
        </div>
</div>
</template>
<script>

import Viewer from 'bpmn-js/lib/Viewer'
import ModelingModule from 'bpmn-js/lib/features/modeling'
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas'
import zoomScroll from './modules/zoomScroll' // 📌注意是使用自己定义过的哦~

export default {
    name: 'MyProcessViewerFull',
    props: {
        xmlString: {
            type: String,
            default: `
                <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:flowable=\"http://flowable.org/bpmn\" id=\"diagram_Process_1676530737163\" targetNamespace=\"http://flowable.org/bpmn\">\n  <bpmn2:process id=\"Process_1676530737163\" name=\"业务流程_1676530737163\" isExecutable=\"true\">\n    <bpmn2:startEvent id=\"Event_1owsibp\" name=\"开始\">\n      <bpmn2:outgoing>Flow_08ir8sc</bpmn2:outgoing>\n    </bpmn2:startEvent>\n    <bpmn2:userTask id=\"Activity_0s7y725\" name=\"步骤1\">\n      <bpmn2:incoming>Flow_08ir8sc</bpmn2:incoming>\n      <bpmn2:incoming>Flow_1k0iofm</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_1maizd4</bpmn2:outgoing>\n    </bpmn2:userTask>\n    <bpmn2:sequenceFlow id=\"Flow_08ir8sc\" sourceRef=\"Event_1owsibp\" targetRef=\"Activity_0s7y725\" />\n    <bpmn2:userTask id=\"Activity_1m3g1n8\" name=\"步骤2\">\n      <bpmn2:incoming>Flow_1maizd4</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_155frac</bpmn2:outgoing>\n    </bpmn2:userTask>\n    <bpmn2:sequenceFlow id=\"Flow_1maizd4\" sourceRef=\"Activity_0s7y725\" targetRef=\"Activity_1m3g1n8\" />\n    <bpmn2:userTask id=\"Activity_1mvzwkp\" name=\"步骤3\">\n      <bpmn2:incoming>Flow_155frac</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_07lih2o</bpmn2:outgoing>\n    </bpmn2:userTask>\n    <bpmn2:sequenceFlow id=\"Flow_155frac\" sourceRef=\"Activity_1m3g1n8\" targetRef=\"Activity_1mvzwkp\" />\n    <bpmn2:exclusiveGateway id=\"Gateway_16o7ky2\" name=\"网关1\">\n      <bpmn2:incoming>Flow_07lih2o</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_1k0iofm</bpmn2:outgoing>\n      <bpmn2:outgoing>Flow_0wrvrkw</bpmn2:outgoing>\n    </bpmn2:exclusiveGateway>\n    <bpmn2:sequenceFlow id=\"Flow_07lih2o\" sourceRef=\"Activity_1mvzwkp\" targetRef=\"Gateway_16o7ky2\" />\n    <bpmn2:endEvent id=\"Event_08oux0h\" name=\"结束\">\n      <bpmn2:incoming>Flow_0wrvrkw</bpmn2:incoming>\n    </bpmn2:endEvent>\n    <bpmn2:sequenceFlow id=\"Flow_1k0iofm\" name=\"不通过\" sourceRef=\"Gateway_16o7ky2\" targetRef=\"Activity_0s7y725\">\n      <bpmn2:extensionElements>\n        <flowable:properties>\n          <flowable:property name=\"value\" value=\"false\" />\n        </flowable:properties>\n      </bpmn2:extensionElements>\n      <bpmn2:conditionExpression xsi:type=\"bpmn2:tFormalExpression\">leadPass==false</bpmn2:conditionExpression>\n    </bpmn2:sequenceFlow>\n    <bpmn2:sequenceFlow id=\"Flow_0wrvrkw\" name=\"通过\" sourceRef=\"Gateway_16o7ky2\" targetRef=\"Event_08oux0h\">\n      <bpmn2:extensionElements>\n        <flowable:properties>\n          <flowable:property name=\"value\" value=\"true\" />\n        </flowable:properties>\n      </bpmn2:extensionElements>\n      <bpmn2:conditionExpression xsi:type=\"bpmn2:tFormalExpression\">leadPass==true</bpmn2:conditionExpression>\n    </bpmn2:sequenceFlow>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1676530737163\">\n      <bpmndi:BPMNEdge id=\"Flow_0wrvrkw_di\" bpmnElement=\"Flow_0wrvrkw\">\n        <di:waypoint x=\"135\" y=\"-190\" />\n        <di:waypoint x=\"202\" y=\"-190\" />\n        <bpmndi:BPMNLabel>\n          <dc:Bounds x=\"158\" y=\"-208\" width=\"22\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1k0iofm_di\" bpmnElement=\"Flow_1k0iofm\">\n        <di:waypoint x=\"110\" y=\"-165\" />\n        <di:waypoint x=\"110\" y=\"-100\" />\n        <di:waypoint x=\"-350\" y=\"-100\" />\n        <di:waypoint x=\"-350\" y=\"-150\" />\n        <bpmndi:BPMNLabel>\n          <dc:Bounds x=\"-136\" y=\"-118\" width=\"33\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_07lih2o_di\" bpmnElement=\"Flow_07lih2o\">\n        <di:waypoint x=\"20\" y=\"-190\" />\n        <di:waypoint x=\"85\" y=\"-190\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_155frac_di\" bpmnElement=\"Flow_155frac\">\n        <di:waypoint x=\"-140\" y=\"-190\" />\n        <di:waypoint x=\"-80\" y=\"-190\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1maizd4_di\" bpmnElement=\"Flow_1maizd4\">\n        <di:waypoint x=\"-300\" y=\"-190\" />\n        <di:waypoint x=\"-240\" y=\"-190\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_08ir8sc_di\" bpmnElement=\"Flow_08ir8sc\">\n        <di:waypoint x=\"-452\" y=\"-190\" />\n        <di:waypoint x=\"-400\" y=\"-190\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"Event_1owsibp_di\" bpmnElement=\"Event_1owsibp\">\n        <dc:Bounds x=\"-488\" y=\"-208\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <dc:Bounds x=\"-481\" y=\"-165\" width=\"22\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_0s7y725_di\" bpmnElement=\"Activity_0s7y725\">\n        <dc:Bounds x=\"-400\" y=\"-230\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1m3g1n8_di\" bpmnElement=\"Activity_1m3g1n8\">\n        <dc:Bounds x=\"-240\" y=\"-230\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1mvzwkp_di\" bpmnElement=\"Activity_1mvzwkp\">\n        <dc:Bounds x=\"-80\" y=\"-230\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Gateway_16o7ky2_di\" bpmnElement=\"Gateway_16o7ky2\" isMarkerVisible=\"true\">\n        <dc:Bounds x=\"85\" y=\"-215\" width=\"50\" height=\"50\" />\n        <bpmndi:BPMNLabel>\n          <dc:Bounds x=\"96\" y=\"-245\" width=\"29\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Event_08oux0h_di\" bpmnElement=\"Event_08oux0h\">\n        <dc:Bounds x=\"202\" y=\"-208\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <dc:Bounds x=\"209\" y=\"-165\" width=\"22\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>\n
            `
        },
        // // 根据id应用样式
        // styleList: {
        //     type: Array,
        //     default: function () {
        //         return [
        //             {
        //                 id: 'Activity_0s7y725',
        //                 color: {
        //                     // fill: '#ff0000',
        //                     // stroke: '#fff'
        //                 }
        //             }
        //         ]
        //     },
        // },
        highlightList: {
            type: Array,
            default: function () {
                return [
                    // {
                    //     id: 'Activity_0s7y725',
                    //     type: 'passed' //passed unpassed maypass current
                    // },
                    // {
                    //     id: 'Activity_1m3g1n8',
                    //     type: 'current' //passed unpassed maypass current
                    // },
                    // {
                    //     id: 'Flow_1maizd4',
                    //     type: 'passed'
                    // }
                ]
            },
        },
        addOverLayList: {
            type: Array,
            default: function () {
                return [
                    // {
                    //     id: 'Activity_0s7y725',
                    //     type: 'test',
                    //     overLayerConfig: {
                    //         position: { bottom: 20, left: 5 },
                    //         html: '<a href="bpmn.io" target="_blank">testAAAAAAAA</a>',
                    //     }
                    // }
                ]
            }
        }

    },
    data() {
        return {

        };
    },
    mounted() {
        this.initBpmnModeler();
        this.createNewDiagram(this.xmlString);
        this.$once("hook:beforeDestroy", () => {
            if (this.bpmnModeler) this.bpmnModeler.destroy();
            this.$emit("destroy", this.bpmnModeler);
            this.bpmnModeler = null;
        });


    },
    methods: {
        initBpmnModeler() {
            if (this.bpmnModeler) return;
            this.bpmnModeler = new Viewer({
                container: this.$refs["bpmn-canvas"],
                additionalModules: [
                    // MoveModule, // 可以调整元素
                    ModelingModule, // 基础工具 MoveModule、SetColor 等依赖于此
                    // MoveCanvasModule, // 移动整个画布
                    // zoomScroll
                ]
            });
            this.$emit("init-finished", this.bpmnModeler);
        },
        // initModelListeners() {
        //     const EventBus = this.bpmnModeler.get("eventBus");
        //     const that = this;
        //     // 注册需要的监听事件, 将. 替换为 - , 避免解析异常
        //     this.events.forEach(event => {
        //         EventBus.on(event, function (eventObj) {
        //             let eventName = event.replace(/\./g, "-");
        //             let element = eventObj ? eventObj.element : null;
        //             that.$emit(eventName, element, eventObj);
        //         });
        //     });
        // },
        /* 创建新的流程图 */
        async createNewDiagram(xml) {
            // 将字符串转换成图显示出来
            let xmlString = xml
            try {
                let { warnings } = await this.bpmnModeler.importXML(xmlString);
                if (warnings && warnings.length) {
                    warnings.forEach(warn => console.warn(warn));
                }
                this.processReZoom()
                // this.setColor()

            } catch (e) {
                console.error(`[Process Designer Warn]: ${e?.message || e}`);
            }
            try {
                this.addMarker()
            } catch (error) {
                console.error('addMarker', error)
            }
            try {
                this.createOverLay()

            } catch (error) {
                console.error('createOverLay', error)
            }


        },
        processReZoom() {
            this.defaultZoom = 1;
            this.bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
        },
        // setColor() {
        //     const modeling = this.bpmnModeler.get('modeling');
        //     const elementRegistry = this.bpmnModeler.get('elementRegistry');
        //     this.styleList.forEach((obj) => {
        //         modeling.setColor(elementRegistry.get(obj.id), obj.color)
        //     })
        // },
        createOverLay() {
            const overlays = this.bpmnModeler.get('overlays');
            const elementRegistry = this.bpmnModeler.get('elementRegistry');
            this.addOverLayList && this.addOverLayList.forEach((obj) => {
                if (obj && obj.id) {
                    const element = elementRegistry.get(obj.id)
                    overlays.add(element, obj.type, obj.overLayerConfig);
                }

            })
        },
        addMarker() {
            const canvas = this.bpmnModeler.get('canvas');
            this.highlightList && this.highlightList.forEach((obj) => {
                if (obj && obj.id && obj.type) {
                    canvas.addMarker(obj.id, 'highlight-' + obj.type)
                }
            })
        }
    },
}
</script>
<style lang="scss">
.my-process-designer.my-process-viewer {

    /* passed */
    /* 背景*/
    .highlight-passed.djs-shape .djs-visual> :nth-child(1) {
        fill: #AAE2FF !important;
        stroke: #8ACCEE !important;
        /* fill-opacity: 0.2 !important; */
    }

    /* 文本*/
    .highlight-passed.djs-shape .djs-visual> :nth-child(2) {
        fill: black !important;
    }

    /* 图标 */
    .highlight-passed.djs-shape .djs-visual>path {
        fill: black !important;
        fill-opacity: 0.2 !important;
        stroke: black !important;
    }

    /* 连接 */
    .highlight-passed.djs-connection>.djs-visual>path {
        stroke: #DA5354 !important;
    }

    /* current */
    /* 背景*/
    .highlight-current.djs-shape .djs-visual> :nth-child(1) {
        fill: #FFE8CC !important;
        stroke: #F4C799 !important;
        /* fill-opacity: 0.2 !important; */
    }

    /* 文本*/
    .highlight-current.djs-shape .djs-visual> :nth-child(2) {
        fill: black !important;
    }

    /* 图标 */
    .highlight-current.djs-shape .djs-visual>path {
        fill: black !important;
        fill-opacity: 0.2 !important;
        stroke: black !important;
    }

    /* maypass */
    .highlight-maypass.djs-shape .djs-visual> :nth-child(1) {
        fill: #98F6EF !important;
        stroke: #5BDFD5 !important;
        /* fill-opacity: 0.2 !important; */
    }

    /* 文本*/
    .highlight-maypass.djs-shape .djs-visual> :nth-child(2) {
        fill: black !important;
    }

    /* 图标 */
    .highlight-maypass.djs-shape .djs-visual>path {
        fill: black !important;
        fill-opacity: 0.2 !important;
        stroke: black !important;
    }

    /* 连接 */
    .highlight-maypass.djs-connection>.djs-visual>path {
        stroke: #1BD6CC !important;
    }


    /* unpassed */
    .highlight-unpassed.djs-shape .djs-visual> :nth-child(1) {
        fill: #BFF3C3 !important;
        stroke: #9BD5B5 !important;
        /* fill-opacity: 0.2 !important; */
    }

    /* 文本*/
    .highlight-unpassed.djs-shape .djs-visual> :nth-child(2) {
        fill: black !important;
    }

    /* 图标 */
    .highlight-unpassed.djs-shape .djs-visual>path {
        fill: black !important;
        fill-opacity: 0.2 !important;
        stroke: black !important;
    }

    /* 连接 */
    .highlight-unpassed.djs-connection>.djs-visual>path {
        stroke: #DADADA !important;
    }
}
</style>