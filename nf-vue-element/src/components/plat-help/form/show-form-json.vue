<template>
  <!--按照meta显示子控件-->
  <div>
    <json-format :json="formMeta"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import { manageFormMetaHelp } from '@/store/manage/manage-form'

import josnFormat from '@/components/plat-help/json-format/json-format'
import lifeCycle from '@/jsmodule/lifecycle.js'

/**
 * 显示表单控件，显示表单的json
 * ** 按照meta动态渲染表单控件
 * ** 显示meta，js 格式和json文件格式
*/
export default {
  name: 'show-form-json',
  components: {
    'json-format': josnFormat
  },
  setup () {
    lifeCycle('show-form-json- 下右-显示表单的json')

    const value = ref(0)

    // 整个表单的meta
    const { getFormMeta } = manageFormMetaHelp()
    // console.log('状态里的formmeta--------', getFormMeta())
    const formMeta = getFormMeta()

    return {
      formMeta, // 当前表单子控件meta
      value
    }
  }

}
</script>
