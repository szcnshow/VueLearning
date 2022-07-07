<template>
  <nf-find
    ref="findControl"
    v-model="query"
    :meta="meta"
  />
</template>

<script>
import { reactive } from 'vue'
import elFind from '@/components/nf-el-find/el-find-div'

export default {
  name: 'crud-data-find',
  components: {
    'nf-find': elFind
  },
  setup () {
    // 查询
    // 读取json，获得配置。
    const jsonFind = require('@/views/json-crud/meta-find.json')
    const meta = reactive(jsonFind.findMeta)
    // 查询条件
    const query = reactive({})

    return {
      query, // 查询条件
      meta
    }
  }
}
</script>
