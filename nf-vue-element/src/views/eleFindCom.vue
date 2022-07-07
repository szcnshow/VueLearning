<template>
  <!--演示查询控件-->
  <nf-find
    ref="formControl"
    v-model="query"
    :meta="meta"
  />
  {{query}}
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import findCom from '@/components/nf-el-find/el-find-div'
import { getControlTypeOptionList } from '@/components/controlConfig/config.js'

export default {
  name: 'eleFindComponent',
  components: {
    'nf-find': findCom
  },
  setup () {
    const query = reactive({})

    // 控件类型的列表
    const { typeOptionList } = getControlTypeOptionList()

    // 读取json，获得配置。
    const json = require('@/views/json/meta-find.json')
    const meta = reactive(json.formMeta)
    // 添加重新绑定的开关
    meta.reload = false

    // 设置组件类型
    meta.itemMeta[103].optionList = typeOptionList
    console.log('meta', meta)

    // 获取 $ref
    const formControl = ref(null)
    onMounted(() => {
      console.log('查询dom', formControl)
    })
    const resetForm = () => {
      // 清空表单
      formControl.value.resetForm()
    }

    return {
      query,
      // 渲染表单的meta
      meta,
      // 表单的dom
      formControl,
      resetForm
    }
  }
}
</script>
