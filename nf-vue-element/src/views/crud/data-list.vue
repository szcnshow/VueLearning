<template>
  {{moduleId}}
  <!--查询功能-->
  <data-find/>
  <!--操作按钮-->
  <div style="background:#fff;">
    <el-space wrap>
      <el-button type="primary" @click="addNew"> 添 加 </el-button>
      <el-button type="primary" @click="update"> 修 改 </el-button>
      <el-button type="primary" @click="deleteData"> 删 除 </el-button>
      <el-button type="primary" @click="loadList"> 更 新 </el-button>
    </el-space>
  </div>
  <!--数据列表-->
  <nf-grid-list
    v-bind="meta"
    :data-list="dataList"
  />
  <!--分页功能-->
  <data-page/>
  <!--弹窗的表单-->
  {{formState}}
  <data-edit
    :moduleId="moduleId"
  >
  </data-edit>
</template>

<script>
import { reactive } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import elGridList from '@/components/nf-el-grid/nf-el-grid-list'
import dataEdit from './data-edit'
import dataFind from './data-find'
import dataPage from './data-page'
import crudManage from './crud-manage.js'

export default {
  name: 'crud-data-list',
  components: {
    'nf-grid-list': elGridList,
    'data-edit': dataEdit,
    'data-find': dataFind,
    'data-page': dataPage
  },
  props: {
    moduleId: Number
  },
  setup (props) {
    // 路由
    onBeforeRouteUpdate((to, from, next) => {
      console.log(to, from, next)
      console.log('to.params.moduleId', to.params.moduleId)
      next()
    })

    // 列表
    const json = require('@/views/json-crud/meta-grid-list.json')
    const meta = reactive(json.gridListMeta.baseMeta)
    meta.itemMeta = json.gridListMeta.itemMeta

    // 注入
    const {
      formState,
      register,
      getDataSource
    } = crudManage()

    // 注册
    register(props.moduleId)

    // 列表数据
    const dataList = getDataSource()
    dataList.push({
      id: new Date().valueOf(),
      CustomerId: 100,
      CustomerName: '测试',
      ProvinceId: '北京',
      cityId: '西城',
      Address: '某某街10号',
      Postcode: '100000',
      Email: 'abc@163.com',
      Contacts: '张山',
      ContactMobile: '13812345678',
      CreateDate: new Date(),
      CustomerType: '潜在客户',
      CustomerSource: '电话营销',
      CustomerLevel: '**',
      Remarks: '测试一下'
    })

    // 添加
    const addNew = () => {
      formState.isOpen = true
      formState.editState = 'add'
    }

    // 修改
    const update = () => {
      formState.isOpen = true
      formState.editState = 'update'
    }

    // 删除
    const deleteData = () => {
    }

    // 获取记录
    const ds = getDataSource()

    const loadList = () => {
      console.log('getDataSource()', getDataSource())
    }

    return {
      formState,
      addNew, // 添加新数据
      update,
      deleteData,
      meta,
      ds,
      dataList,
      loadList
    }
  }
}
</script>
