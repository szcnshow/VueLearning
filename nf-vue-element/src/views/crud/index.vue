<template>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu id="menu"
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
            <el-menu-item index="1-1">
              <router-link :to="{name:'crud-list', params:{ moduleId: 100} }">客户信息</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{name:'crud-list', params:{ moduleId: 101} }">商品信息</router-link>
            </el-menu-item>
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
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from 'vue'

// import elGridList from '@/components/nf-el-grid/nf-el-grid-list'
// import elFind from '@/components/nf-el-find/el-find-div'
// import elForm from '@/components/nf-el-form/el-form-div'

// 实现增删改查的演示
export default {
  name: 'crud-index',
  components: {
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

    return {
      // 左侧导航
      activeIndex,
      handleOpen,
      handleClose
    }
  }
}
</script>

<style>
#menu {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#menu a {
  font-weight: bold;
  color: #2c3e50;
}

#menu a.router-link-exact-active {
  color: #42b983;
}
</style>
