<template>
  表单子控件：
  <el-input-number
    style="width:100px"
    controls-position="right"
    v-model="listCount"
    @input="addItemList"
    :min="0"
    :max="10000"
    size="mini"
    label="子控件的数量">
  </el-input-number>
  <el-table
    :data="arrItemList"
    style="width: 100%"
    @row-click="editItem"
  >
    <el-table-column
      label="id"
      width="120">
      <template #default="scope">
        <el-input-number
          style="width:100px"
          controls-position="right"
          v-model="scope.row.controlId"
          :min="0"
          :max="99999"
          label="控件ID">
        </el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      label="名称"
      width="120">
      <template #default="scope">
        <el-input
          v-model="scope.row.colName"
          placeholder="子控件名称"
        >
        </el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { reactive, ref, toRaw } from 'vue'
// 状态管理里面的表单meta
import { manageFormMetaHelp } from '@/store/manage/manage-form'
import lifeCycle from '@/jsmodule/lifecycle.js'

/**
 * 编辑表单子控件的属性
 * ** 设置子控件的id、name、和控件类型
 */
export default {
  name: 'edit-form-items-props',
  components: {
  },
  setup () {
    lifeCycle('edit-form-items-props-编辑表单的子控件的meta')

    // 获取状态管理里面的表单meta
    const { getFormBaseMeta, getFormItemMeta, getCurrFormItemMeta } = manageFormMetaHelp()

    // 表单自己的属性
    const formBaseMeta = getFormBaseMeta()
    // 状态管理里的表单的子控件的meta列表
    const formItemList = getFormItemMeta()
    // console.log('===状态管理的表单子控件列表', formItemList)

    // 当前编辑的表单子控件的meta，分成三种，全部，标准和精简
    const currFormItemMeta = getCurrFormItemMeta()

    // 转换成数组的形式，便于el-table使用
    const arrItemList = reactive([])
    for (const key in formItemList) {
      arrItemList.push(formItemList[key])
    }

    // 子控件的数量
    const listCount = ref(arrItemList.length)

    // 添加新的选项
    const addItemList = (val) => {
      // 获取最大的id，判断数量，多了就添加，少了就不管
      if (val > arrItemList.length) {
        // 获取最大ID
        let maxId = 100
        arrItemList.forEach((item) => { maxId = maxId > item.controlId ? maxId : item.controlId })
        for (let i = arrItemList.length; i < val; i++) {
          maxId++
          formItemList[maxId] = {
            controlId: maxId,
            colName: 'newName',
            controlType: 101
          }
          arrItemList.push(formItemList[maxId])
          formBaseMeta.colOrder.push(maxId)
        }
      }
    }

    // 删掉一个备选项
    const handleDelete = (index, row) => {
      console.log(index, row)
      // 删除绑定的数组
      arrItemList.splice(index, 1)
      // 删除状态管理里面的
      delete formItemList[row.controlId]
      // 修改数量
      listCount.value = listCount.value - 1
      // 修改formBaseMeta.colOrder
      for (let i = 0; i < formBaseMeta.colOrder.length; i++) {
        if (formBaseMeta.colOrder[i] === row.controlId) {
          formBaseMeta.colOrder.splice(i, 1)
        }
      }
    }

    // 加载编辑表单需要的meta，读取json，获得配置。
    const json = require('@/components/plat-help/json/meta-form.json')
    // console.log('编辑表单的meta', json)
    // 创建表单控件需要的meta
    const formMeta = json.formMeta // 表单的meta
    // 添加表单控件重新绑定的开关
    formMeta.reload = false

    // 选择某一行，设置为当前编辑的子控件
    const editItem = (row, column, event) => {
      // console.log(row, column, event)
      currFormItemMeta.id = row.controlId
      Object.assign(currFormItemMeta.allItemMeta, toRaw(row))
      console.log('设置后的 currFormItemMeta.allItemMeta', currFormItemMeta.allItemMeta)
    }

    // 把表单自己的属性设置到状态里面，现在是直接响应过去了。
    const submit = () => {
      // Object.assign(formItemList, model.value)
    }

    return {
      listCount, // 子控件的数量
      addItemList, // 添加新的子控件
      handleDelete, // 删除一个子控件
      formItemList, // 表单数据
      arrItemList, // 数组形式的子控件列表，用于绑定el-table
      formMeta, // 创建表单控件需要的meta
      editItem, // 选择某一行，设置为当前的子控件
      submit // 把表单自己的属性设置到状态里面
    }
  }

}
</script>
