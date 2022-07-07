<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :current-page="currentPage"
    @current-change="pagerChange"
    :total="100">
  </el-pagination>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'crud-data-page',
  setup () {
    // 分页
    const currentPage = ref(1)
    const pagerChange = (val) => {
      console.log(`当前页: ${val}`)
    }

    return {
      currentPage, // 当前页号
      pagerChange // 分页事件
    }
  }
}
</script>
