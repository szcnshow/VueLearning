<template>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu
        :default-active="activeIndex"
        default-openeds="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>增删改查的演示</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">客户信息</el-menu-item>
            <el-menu-item index="1-2">商品信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
      </el-menu>
      {{query}}
    </el-col>
    <el-col :span="20">
      <nf-find
        ref="findControl"
        v-model="query"
        :meta="metaFind"
      />
      <div style="background:#fff;">
        <el-space wrap>
          <el-button type="primary" @click="dialogFormVisible = true"> 添 加 </el-button>
          <el-button type="primary" @click="dialogFormVisible = true"> 修 改 </el-button>
          <el-button type="primary" @click="dialogFormVisible = true"> 删 除 </el-button>
        </el-space>
      </div>
      <nf-grid-list
        v-bind="metaGrid"
        :data-list="dataList"
      />
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="pagerChange"
        :total="100">
      </el-pagination>
      <!--弹窗的表单-->
      <el-dialog title="添加客户信息" :modal="true" v-model="dialogFormVisible">
        <nf-form
          ref="formControl"
          v-model="formModel"
          v-model:partModel="partModel"
          :meta="metaForm">
        </nf-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, ref } from 'vue'
import elGridList from '@/components/nf-el-grid/nf-el-grid-list'
import elFind from '@/components/nf-el-find/el-find-div'
import elForm from '@/components/nf-el-form/el-form-div'

// 实现增删改查的演示
export default {
  name: 'zsgc',
  components: {
    'nf-find': elFind,
    'nf-grid-list': elGridList,
    'nf-form': elForm
  },
  setup () {
    // 左侧导航
    const activeIndex = ref('1-1')
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    // 查询
    // 读取json，获得配置。
    const jsonFind = require('@/views/json-crud/meta-find.json')
    const metaFind = reactive(jsonFind.findMeta)
    // 查询条件
    const query = reactive({})

    // 列表
    const jsonGrid = require('@/views/json-crud/meta-grid-list.json')
    const metaGrid = reactive(jsonGrid.gridListMeta.baseMeta)
    metaGrid.itemMeta = jsonGrid.gridListMeta.itemMeta

    // 列表数据
    const dataList = reactive([])
    dataList.push({
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

    // 分页
    const currentPage = ref(1)
    const pagerChange = (val) => {
      console.log(`当前页: ${val}`)
    }

    // 表单
    const jsonForm = require('@/views/json-crud/meta-form.json')
    const metaForm = reactive(jsonForm.formMeta) // 表单的meta
    // 添加重新绑定的开关
    metaForm.reload = false

    const formModel = reactive({
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

    const partModel = reactive({})

    const formControl = ref(null)
    const dialogFormVisible = ref(false)

    return {
      // 左侧导航
      activeIndex,
      handleOpen,
      handleClose,
      // CRUD
      query, // 查询条件
      dataList, // 数据列表
      currentPage, // 当前页号
      formModel, // 表单的model
      partModel,
      formControl,
      dialogFormVisible,
      // meta
      metaFind,
      metaGrid,
      metaForm,
      // 事件
      pagerChange // 分页事件
    }
  }
}
</script>
