<!--  通用表格展示和编辑按钮  -->

<template>
  <el-table
    :data="props.tableDatas"
    style="width:100%"
    >
    <template v-for="col in props.tableColumns" :key="col.label">
      <el-table-column 
        :label="col.label"
        :prop="col.prop"
        :formatter="col.formatter"
        >
      </el-table-column>      
    </template>
    <el-table-column fixed="right" label="Edit" width="120">
      <template #default="scope">
        <span>
          <el-button type="info" :icon="Edit" circle @click='$emit("onEdit", scope.$index)'/>
          <el-button type="info" :icon="Delete" circle @click='$emit("onDelete", scope.$index)'/>
        </span>
      </template>
    </el-table-column>  
  </el-table>

</template>

<script setup>

import {onBeforeMount,  defineProps } from "vue";
import { Delete, Edit } from '@element-plus/icons-vue'

const props = defineProps({
  tableDatas: {
    type:Array,
    default() {return []},
    required: true,
  },
  tableColumns: {
    type: Array,
    default() { return [] },
    required: true,
  }
});


onBeforeMount(() => {
    props.tableDatas.forEach((item) => {console.log(item)});
});

</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>