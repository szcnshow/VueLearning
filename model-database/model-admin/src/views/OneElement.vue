<template>
  <el-form-item :label="editData.label" :label-width="labelWidth">
    <el-button >test</el-button>
  </el-form-item>
</template>

<!-- 
v-if="item.dataType == typeof(Boolean)"
  <OneElement v-for="(item, index) in editDatas" :key="index" :index="index" :labelWidth="150" :editData="item"></OneElement>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="modifySampleData">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  
    <el-checkbox v-if="dataType == typeof(Boolean)" :checked="editData.dataValue" disabled="editData.isReadonly" />
  <el-input v-else-if="dataType == typeof(Number)" v-model="editData.dataValue" 
      :max="editData.maximum" :min="editData.minimum" readonly="editData.isReadonly" />
    <el-select v-else-if="isSelection" v-model="editData.dataValue" disabled="editData.isReadonly">
      <el-option
        v-for="item in editData.selections"
        :key="item.key"
        :label="item.value"
        :value="item.key"
      />
    </el-select> -->
<script setup>
import { reactive, ref } from "vue";
import { defineProps } from "vue";

const labelWidth = ref(80.0);
const editData = reactive({
  innerName: '',
  label:'',
  dataValue:'',
  dataType:'',
  isFile: false,
  inputable: true,
  isValid:true,
  isSelection:false,
  selections:{},
  minimum:10.0,
  maximum:100.0,
  isNewline:false,
  visibleSource:'',
  visibleValue:'',
  visibleEqual:true,
  isButton:false,
  isDatagrid:false,
  isReadonly:false,
}) ;

// eslint-disable-next-line no-unused-vars
const props = defineProps(['labelWidth', 'editData'])

</script>
