<template>

  <el-form  :model="dlgData" label-position="left" label-width="auto">
    <template v-for="(item, index) in dlgData" :key="div+index" >
      <el-row :gutter="24" :key="'row'+index" v-if="index%2 == 0">
        <el-col :span="12">
          <el-form-item  :key="el+index" 
            :label="item.label"
            >
            <el-checkbox v-if="item.dataType == 'Boolean'"
              :checked="item.dataValue" 
              :disabled="item.isReadonly" 
              :key="index"/>
            <el-input v-else-if="item.dataType == 'Single' || item.dataType == 'Integer' "
              v-model.number="item.dataValue" 
              :max="item.maximum" 
              :min="item.minimum" 
              :readonly="item.isReadonly" />
            <el-select v-else-if="item.isSelection"
              v-model="item.dataValue"
              :value="item.dataValue" 
              :disabled="item.isReadonly" 
              >
              <el-option
                v-for="selitem in item.selections"
                :key="selitem.key"
                :label="selitem.value"
                :value="selitem.key"
              />
            </el-select>
            <el-input v-else-if="item.dataType == 'String'"
              v-model="item.dataValue" 
              :min="item.minimum" 
              :readonly="item.isReadonly" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="(index+1)<(dlgData.length)">
          <el-form-item  :key="el+(index+1)" 
            :label="dlgData[index+1].label"
            >
            <el-checkbox v-if="dlgData[index+1].dataType == 'Boolean'"
              :checked="dlgData[index+1].dataValue" 
              :disabled="dlgData[index+1].isReadonly" 
              :key="index"/>
            <el-input v-else-if="dlgData[index+1].dataType == 'Number'"
              v-model.number="dlgData[index+1].dataValue" 
              :max="dlgData[index+1].maximum" 
              :min="dlgData[index+1].minimum" 
              :readonly="dlgData[index+1].isReadonly" />
            <el-select v-else-if="dlgData[index+1].isSelection"
              v-model="dlgData[index+1].dataValue"
              :value="dlgData[index+1].dataValue" 
              :disabled="dlgData[index+1].isReadonly" 
              >
              <el-option
                v-for="selitem in dlgData[index+1].selections"
                :key="selitem.key"
                :label="selitem.value"
                :value="selitem.key"
              />
            </el-select>
            <el-input v-else-if="dlgData[index+1].dataType == 'String'"
              v-model="dlgData[index+1].dataValue" 
              :min="dlgData[index+1].minimum" 
              :readonly="dlgData[index+1].isReadonly" />
          </el-form-item>
        </el-col>       
      </el-row>
    </template>
  </el-form>
</template>


<script setup>
import {ref, reactive, defineProps } from "vue";

const props = defineProps({
  dlgData: {
    type: Array,
    default() { return [] },
    required: true,
  },
  colCount: {
    type: Number,
    default() { return 2 },
    required: true,
  },
});


const dlgData = reactive(props.dlgData);

const needNewLine = (colIndex) =>{
  if(colIndex == 0) return false;
  else if(props.dlgData[totalDispItemIndex].needNewLine) return true;
  else if(colIndex >= props.colCount) return true;
  else return false;
}

//显示的数据index
const totalDispItemIndex = ref(0);

const colVisible = (colIndex)=>{
  props.dlgData[totalDispItemIndex]
  if(colIndex == 0)
  if(props.dlgData[totalDispItemIndex].needNewline == true) {
    return true;
  }
}

// eslint-disable-next-line no-unused-vars
const editDatas = reactive(
  {
    values: [
      {
        innerName: 'testBoolean',
        label:'测试Boolean',
        dataValue:true,
        dataType:"Boolean",
        inputable: true,
        isValid:true,
        minimum:10.0,
        maximum:100.0,
        isReadonly:false,
      },
      {
        innerName: 'testNumber',
        label:'测试Number',
        dataValue:30.0,
        dataType: "Number",
        inputable: true,
        isValid:true,
        minimum:10.0,
        maximum:100.0,
        isReadonly:false,
      },
      {
        innerName: 'testSelection',
        label:'测试下拉选择',
        dataValue:'Option A',
        dataType: "String",
        inputable: true,
        isValid:true,
        isSelection: true,
        selections:[
          {
            key:'Option A',
            Value: '选项A'
          },
          {
            key:'Option B',
            Value: '选项B'
          },
          {
            key:'Option C',
            Value: '选项C'
          },
          {
            key:'Option D',
            Value: '选项D'
          },
        ]
        ,
      },
      {
        innerName: 'testString',
        label:'测试String',
        dataValue:'',
        dataType: "String",
        inputable: true,
        isValid:true,
        isReadonly:false,
      },
    ]
  
}) ;
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
