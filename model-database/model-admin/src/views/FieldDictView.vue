<!-- 管理数据库字段字典  -->
<template>
  <label>数据表</label>
  <el-select style="left-margin:50"
    v-model="selTable" @change="selChanged">
    <el-option
      v-for="item in tableNames"
      :key="item.tableName"
      :label="item.tableName"
      :value="item.tableName"
    />
  </el-select>
  <CommonTableVue 
    :tableDatas="tableDatas" 
    :tableColumns="tableColumns"
    @onEdit="onEdit"
    @onDelete="onDelete">
  </CommonTableVue>
  <el-button @click="onEdit" type="info" :icon="Plus">增加</el-button>
  <el-dialog title="Modify Sample Informations" :model-value="editorVisible">
    <EditorDialog :dlgData="editorData" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click='editorVisible=false'>取消</el-button>
        <el-button type="primary" @click="onOK">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>

import axios from "axios";
import {APIURL} from "@/constants";
// eslint-disable-next-line no-unused-vars
import {onBeforeMount, reactive, ref} from "vue"
import CommonTableVue from "./commons/CommonTable.vue";
import { ElMessageBox } from 'element-plus'
import EditorDialog from "./EditorDialog.vue";
import { Plus } from '@element-plus/icons-vue';

const tableDatas = ref([]);
const tableColumns = [
  {
    label:"字段名称",
    prop:"fieldName",
    width:"200",
  },
  {
    label:"字段属性",
    prop:"fieldProp",    
    width:"600",
  },
]

const tableNames = ref([]);
const selTable = ref("");
const editorVisible = ref(false);
const editorData = ref([]);

async function getSamples(){
  try {
    const result = await axios.get(`${APIURL}/fielddict`);
    if(result.status == 200)
    {
      tableNames.value = result.data.data;
      //result.data.data.reduce((acc, obj)=>{tableNames.value.push(obj.tableName)});
      //tableNames.value.forEach((item) => console.log(item));
      // for(let i=0; i<result.data.data.length; i++) {
      //   tableNames.value.push(result.data.data[i].tableName);
      // }
    }
  } catch(error)
  {
    alert(error.message);
  }
}

async function selChanged(item)
{
  try {
    const result = await axios.get(`${APIURL}/fielddict/${item}`);
    if(result.status == 200) {
      tableDatas.value = result.data.data;
    }
  } catch(error)
  {
    alert(error.message);
  }
}

onBeforeMount(() => {
  getSamples();
})

function onDelete(index)
{
  ElMessageBox.confirm(
    `确认删除${tableDatas.value[index].fieldName} ?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      deleteField(index);
    })
    .catch(() => {
    })
}

const fieldProperty = [
  {
    innerName: 'innerName',
    label:'内部名称',
    dataType:"String",
  },
  {
    innerName: 'label',
    label:'显示名称',
    dataType:"String",
  },
  {
    innerName: 'dataType',
    label:'数据类型',
    dataType: "String",
    isSelection: true,
    selections:[
      {
        key:'Boolean',
        Value: 'Boolean'
      },
      {
        key:'String',
        Value: 'String'
      },
      {
        key:'Single',
        Value: 'Single'
      },
      {
        key:'Integer',
        Value: 'Integer'
      },
    ]
  },
  {
    innerName: 'inputable',
    label:'可输入',
    dataType:"Boolean",
  },
  {
    innerName: 'isValid',
    label:'可显示',
    dataType:"Boolean",
  },
  {
    innerName: 'isSelection',
    label:'可选择',
    dataType:"Boolean",
  },
  {
    innerName: 'selections',
    label:'选项列表(K-V)',
    dataType:"String",
  },
  {
    innerName: 'minimum',
    label:'最小值',
    dataType:"Single",
  },
  {
    innerName: 'maximum',
    label:'最大值',
    dataType:"Single",
  },
  {
    innerName: 'isReadonly',
    label:'只读',
    dataType:"Boolean",
  },
]

async function deleteField(index)
{
  try{
    const result = axios.delete(`${APIURL}/fielddict/${tableDatas.value[index].id}`);
    if(result.status == 200) {
      tableDatas.value.slice(index, 1);
    }
  } catch(error)
  {
    alert(error.message);
  }  
}

function onOK()
{
  editorVisible.value = false;
}

function onEdit(index)
{
  editorVisible.value = true;
  const fieldprpo = JSON.parse(tableDatas.value[index].fieldProp);
  fieldprpo.innerName = tableDatas.value[index].fieldName;
  editorData.value = fieldProperty;
}
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
