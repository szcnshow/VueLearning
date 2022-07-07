<template>
  <!--按照meta显示子控件-->
  <div>
    <elForm
      v-model="model"
      v-model:partModel="partModel"
      :meta="formMeta">
    </elForm>
    {{model}}
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { manageFormMetaHelp } from '@/store/manage/manage-form'
import elForm from '@/components/nf-el-form/el-form-div'
import lifeCycle from '@/jsmodule/lifecycle.js'

/**
 * 依据状态管理的表单的json，显示动态渲染的表单。
*/
export default {
  name: 'show-form-dom',
  components: {
    elForm
  },
  setup () {
    lifeCycle('show-form-dom')

    const value = ref(0)

    // 表单的model
    const model = reactive({})
    const partModel = reactive({})

    // 表单的meta
    const { getFormMeta } = manageFormMetaHelp()
    const formMeta = getFormMeta()
    // console.log('整个表单的meta--------', formMeta)

    formMeta.reload = ref(false)

    watch(() => formMeta.baseMeta.colOrder.length, (v1, v2) => {
      formMeta.reload = !formMeta.reload
    })

    return {
      model,
      partModel,
      formMeta, // 当前表单子控件meta
      value
    }
  }

}
</script>
