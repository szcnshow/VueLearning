<template>
  <!--弹窗的表单-->
  <el-dialog
    :title="formState.editState + '客户信息'"
    :modal="true"
    v-model="formState.isOpen"
  >
    <nf-form
      ref="formControl"
      v-model="formModel"
      v-model:partModel="partModel"
      :meta="meta"
    >
    </nf-form>
    <el-button type="primary" @click="addNew"> 确 定 </el-button>
  </el-dialog>{{formState.editState}}--{{formState2}}
</template>

<script>
import { reactive, ref } from 'vue'
import elForm from '@/components/nf-el-form/el-form-div'
import crudManage from './crud-manage.js'

export default {
  name: 'crud-data-edit',
  components: {
    'nf-form': elForm
  },
  props: {
    moduleId: Number
  },
  setup (props) {
    // 表单
    const json = require('@/views/json-crud/meta-form.json')
    const meta = reactive(json.formMeta) // 表单的meta
    // 添加重新绑定的开关
    meta.reload = false

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

    // 注入
    const {
      getFormState,
      getDataSource
    } = crudManage()

    const ds = getDataSource()
    const formState = getFormState()
    const formState2 = getFormState(props.moduleId)

    // 添加新数据
    const addNew = () => {
      const newData = {
        id: new Date().valueOf()
      }
      Object.assign(newData, formModel)
      ds.unshift(newData)
    }

    return {
      formState2,
      formState,
      formModel, // 表单的model
      partModel,
      formControl,
      dialogFormVisible,
      meta,
      // 事件
      addNew
    }
  }
}
</script>
