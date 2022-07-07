<template>
  <!-- <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem"
    >Add Item</el-button
  > -->
  <EditorDialog :dlgVisible="dlgVisible" :dlgData="editDatas.values" width="600px" @okClicked="okClicked" @cancelClicked="cancelClicked" ></EditorDialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import EditorDialog from './EditorDialog.vue';

const dlgVisible = ref(true);
const okClicked = (data) => {
  alert(data[3].dataValue); 
  dlgVisible.value=false
};

const cancelClicked = () => {
  alert("Cancel Clicked");
  dlgVisible.value = false;
};

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

const now = new Date()

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

// eslint-disable-next-line no-unused-vars
const deleteRow = (index) => {
  tableData.value.splice(index, 1)
}

// eslint-disable-next-line no-unused-vars
const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}
</script>
