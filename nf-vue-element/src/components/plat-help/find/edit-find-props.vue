<template>
  <elForm
    v-model="model"
    :meta="formMeta">
  </elForm>
</template>

<script>
import { reactive, ref } from 'vue'
import { manageFormMetaHelp } from '@/store/manage/manage-form'
import elForm from '@/components/nf-el-form/el-form-div'
import lifeCycle from '@/jsmodule/lifecycle.js'

/**
 * 表单meta的 辅助工具
 * ** 设置表单自己的props
 */
export default {
  name: 'edit-form-props',
  components: {
    elForm
  },
  setup () {
    lifeCycle('edit-form-props-编辑表单的属性')

    // 获取状态管理里面的表单meta
    const { getFormBaseMeta } = manageFormMetaHelp()

    // 绑定表单控件的model
    const model = ref({})
    // 状态管理里的表单自己的属性
    const formModel = getFormBaseMeta()
    // console.log('状态里的 表单自己的属性', formModel)

    // 设置要修改的数据
    model.value = formModel

    // 加载编辑表单需要的meta
    // 读取json，获得配置。
    const json = require('@/components/plat-help/json-find/meta-find.json')
    // console.log('编辑表单的meta', json)
    // 创建表单控件需要的meta
    const formMeta = reactive(json.formMeta) // 表单的meta
    // 添加重新绑定的开关
    formMeta.reload = false

    const value = ref(0)

    // 把表单自己的属性设置到状态里面
    const submit = () => {
      Object.assign(formModel, model.value)
    }
    return {
      model, // 绑定表单用
      formModel, // 表单数据
      formMeta, // 创建表单控件需要的meta
      submit, // 把表单自己的属性设置到状态里面
      value
    }
  }

}
</script>
