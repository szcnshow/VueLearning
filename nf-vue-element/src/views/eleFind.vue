<template>
  <div class="home">
    {{findModel}}
    <el-form label-position="left" inline class="demo-table-expand">
      <el-form-item label="商品名称" style="width:600px">
        <el-find-base
          v-model="findModel.name"
          v-bind="metaText"
        />
      </el-form-item>
      <el-form-item label="年龄" style="width:600px">
        <el-find-base
          v-model="findModel.age"
          v-bind="metaNumber"
        />
      </el-form-item>
      <el-form-item label="日期" style="width:600px">
        <el-find-base
          v-model="findModel.date"
          v-bind="metaDate"
        />
      </el-form-item>
      <el-form-item label="单选" style="width:600px">
        <el-find-base
          v-model="findModel.radio"
          v-bind="metaRadio"
        />
      </el-form-item>
      <el-form-item label="下拉" style="width:600px">
        <el-find-base
          v-model="findModel.select"
          v-bind="metaSelect"
        />
      </el-form-item>
      <el-form-item label="日期" style="width:600px">
        <el-find-date
          v-model="findModel.date"
          v-bind="metaDate"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
// @ is an alias to /src
import findBase from '@/components/nf-el-find-item/t-base'
import findDate from '@/components/nf-el-find-item/d-date'

const meteList = {
  // 单行文本的属性
  metaText: reactive({
    controlId: 101,
    colName: 'name',
    controlType: 101
  }),
  metaNumber: reactive({
    controlId: 102,
    colName: 'age',
    controlType: 120,
    findKind: [411, 417, 412, 413, 414, 415, 416]
  }),
  metaDate: reactive({
    controlId: 103,
    colName: 'date',
    controlType: 110,
    findKind: [421, 427, 422, 423, 424, 425, 426]
  }),
  metaSelect: reactive({
    controlId: 104,
    colName: 'select',
    controlType: 160,
    optionList: [
      { value: 1, label: '选项一' },
      { value: 2, label: '选项二' },
      { value: 3, label: '选项三' },
      { value: 4, label: '选项四' },
      { value: 5, label: '选项五' },
      { value: 6, label: '选项六' },
      { value: 7, label: '选项七' }
    ]
  }),
  metaRadio: reactive({
    controlId: 105,
    colName: 'radio',
    controlType: 153,
    optionList: [
      { value: 1, label: '选项一' },
      { value: 2, label: '选项二' },
      { value: 3, label: '选项三' },
      { value: 4, label: '选项四' },
      { value: 5, label: '选项五' },
      { value: 6, label: '选项六' },
      { value: 7, label: '选项七' }
    ]
  }),
  metaCheck: reactive({
    controlId: 106,
    colName: 'Check',
    controlType: 150,
    optionList: [
      { value: 1, label: '选项一' },
      { value: 2, label: '选项二' },
      { value: 3, label: '选项三' },
      { value: 4, label: '选项四' },
      { value: 5, label: '选项五' }
    ]
  })
}

export default {
  name: 'eleFind',
  components: {
    'el-find-date': findDate,
    'el-find-base': findBase
  },
  setup () {
    const value = ref('1')

    const findModel = reactive({
      name: [],
      age: [],
      date: [],
      select: [],
      radio: [],
      check: []
    })
    return {
      value,
      findModel, // 保存查询结果
      ...meteList
    }
  }

}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
    border-top: 1px solid rgb(197, 193, 193);
    border-left: 1px solid rgb(197, 193, 193);
    border-bottom: 1px solid rgb(197, 193, 193);

  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 200px;
    padding: 5px;
    border-bottom: 1px solid rgb(197, 193, 193);
    border-right: 1px solid rgb(197, 193, 193);
  }
</style>
