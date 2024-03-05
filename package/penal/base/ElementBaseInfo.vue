<template>
  <div class="panel-tab__content">
    <el-form size="mini" label-width="90px" @submit.native.prevent>
      <el-form-item label="_ID">
        <el-input v-model="elementBaseInfo.id" readonly />
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="elementBaseInfo.nodeLabel" :disabled="idEditDisabled" clearable
          @input="updateBaseInfo('nodeLabel')" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="elementBaseInfo.name" clearable @input="updateBaseInfo('name')" />
      </el-form-item>
      <!--流程的基础属性-->
      <template v-if="elementBaseInfo.$type === 'bpmn:Process'">
        <!-- <el-form-item label="版本标签">
          <el-input v-model="elementBaseInfo.versionTag" clearable @change="updateBaseInfo('versionTag')" />
        </el-form-item> -->
        <!-- <el-form-item label="可执行">
          <el-switch v-model="elementBaseInfo.isExecutable" active-text="是" inactive-text="否" @change="updateBaseInfo('isExecutable')" />
        </el-form-item> -->
      </template>
      <el-form-item v-if="elementBaseInfo.$type === 'bpmn:SubProcess'" label="状态">
        <el-switch v-model="elementBaseInfo.isExpanded" active-text="展开" inactive-text="折叠"
          @change="updateBaseInfo('isExpanded')" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ElementBaseInfo",
  props: {
    businessObject: Object,
    type: String,
    idEditDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      elementBaseInfo: {}
    };
  },
  watch: {
    businessObject: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.$nextTick(() => this.resetBaseInfo());
        }
      }
    }
  },
  methods: {
    resetBaseInfo() {
      this.bpmnElement = window?.bpmnInstances?.bpmnElement || {};
      if (!this.bpmnElement.businessObject) {
        return
      }
      this.elementBaseInfo = Object.assign({}, JSON.parse(JSON.stringify(this.bpmnElement.businessObject)), this.bpmnElement.businessObject.$attrs)
      if (this.elementBaseInfo && this.elementBaseInfo.$type === "bpmn:SubProcess") {
        this.$set(this.elementBaseInfo, "isExpanded", this.elementBaseInfo.di?.isExpanded);
      }
    },
    updateBaseInfo(key) {
      if (key === "id") {
        window.bpmnInstances.modeling.updateProperties(this.bpmnElement, {
          id: this.elementBaseInfo[key],
          di: { id: `${this.elementBaseInfo[key]}_di` }
        });
        return;
      }
      if (key === "isExpanded") {
        window?.bpmnInstances?.modeling.toggleCollapse(this.bpmnElement);
        return;
      }
      const attrObj = Object.create(null);
      attrObj[key] = this.elementBaseInfo[key];
      window.bpmnInstances.modeling.updateProperties(this.bpmnElement, attrObj);
    }
  },
  beforeDestroy() {
    this.bpmnElement = null;
  }
};
</script>
