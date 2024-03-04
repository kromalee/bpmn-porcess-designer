<template>
    <div style="width: 100%;height: 100%;">
        <el-button @click="getJson">生成JSON</el-button>
        <MyProcessDesignerFull style="width: 100%;height: 100%;" ref="designer"></MyProcessDesignerFull>
    </div>
</template>


<script>
export default {
    methods: {
        getJson: function () {
            this.$refs['designer'].getJSONData().then((data) => {
                console.log(data)
            })
        }
    }
}
</script>