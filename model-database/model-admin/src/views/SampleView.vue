<template>
  <el-table :data="sampleDatas.value"  style="width: 100%">
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="company" label="Company" width="180" />
    <el-table-column prop="form" label="Form" />
    <el-table-column prop="description" label="Description" />
    <el-table-column fixed="right" label="Edit" >
      <template #default="scope">
        <span>
          <el-button type="primary" :icon="Edit" circle @click.prevent="editData(scope.$index)"/>
          <el-button type="info" :icon="Delete" circle @click.prevent="delData(scope.$index)"/>
        </span>
      </template>
    </el-table-column>  
  </el-table>

  <el-dialog v-model="editDialogVisible" title="Modify Sample Informations">
    <el-form :model="selectData">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model="selectData.value.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Company" :label-width="formLabelWidth">
        <el-input v-model="selectData.value.company" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Form" :label-width="formLabelWidth">
        <el-select v-model="selectData.value.form" placeholder="Please select a form">
          <el-option label="Solid" value="solid" />
          <el-option label="Liquid" value="liquid" />
          <el-option label="Gas" value="gas" />
        </el-select>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input v-model="selectData.value.description" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="modifySampleData">Confirm</el-button>
      </span>
    </template>
  </el-dialog>  

  <el-dialog v-model="delDialogVisible" title="Comfirm Delete" width="50%">
    <span>Delete {{selectData.value.name}} ?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteSampleData">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import axios from "axios";
import {APIURL} from "@/constants";
import { onBeforeMount, reactive, ref } from "vue";
import { Delete, Edit } from '@element-plus/icons-vue'

const sampleDatas = reactive({value:[]});
const editDialogVisible = ref(false)
const delDialogVisible = ref(false)
const formLabelWidth = '140px'
const selectData = reactive({});

  // name:'',
  // form:'',
  // company:'',
  // description:''

async function getSamples(){
  try{
    const smdata = await axios.get(`${APIURL}/sample`);
    sampleDatas.value = Array.from(smdata.data);
  }catch(error) {
    alert(error);
  }
}

onBeforeMount(() => {
  getSamples();
})

/**
 * Clone selected record and pop up editor
 * @param {number} index = record index 
 */
const editData = (index) => {
  // selectData.value = sampleDatas.value[index];
  selectData.value = JSON.parse(JSON.stringify(sampleDatas.value[index]));
  editDialogVisible.value = true;
}

const modifySampleData = () =>{
  editDialogVisible.value = false
  putSampleData();
}

async function putSampleData()
{
  try{
    await axios.put(`${APIURL}/sample/${selectData.value.id}`, selectData.value);
  }catch(error) {
    alert(error);
  }
}

const delData = (index) => {
  selectData.value = sampleDatas.value[index];
  delDialogVisible.value = true;
}

const deleteSampleData = () =>{
  delDialogVisible.value = false
  delSampleData();
}

async function delSampleData()
{
  try{
    await axios.put(`${APIURL}/sample/${selectData.value.id}`, selectData.value);
  }catch(error) {
    alert(error);
  }
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
