<template>
  <div id="nav">
  </div>
  <el-menu
    :default-active="activeIndex"
    :router="true"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/"><router-link to="/">原生基础组件</router-link></el-menu-item>
    <el-menu-item index="/About"><router-link :to="{name:'About'}">关于</router-link></el-menu-item>
    <el-menu-item index="/eleBase"><router-link :to="{name:'eleBase'}">ele基础组件</router-link></el-menu-item>
    <el-menu-item index="/eleForm"><router-link :to="{name:'eleForm'}">表单组件</router-link></el-menu-item>
    <el-menu-item index="/eleFind"><router-link :to="{name:'eleFind'}">基础查询</router-link></el-menu-item>
    <el-menu-item index="/eleFindCom"><router-link :to="{name:'eleFindCom'}">查询组件</router-link></el-menu-item>
    <el-menu-item index="/eleGrid"><router-link :to="{name:'eleGrid'}">列表组件</router-link></el-menu-item>
    <el-menu-item index="/helpForm"><router-link :to="{name:'helpForm'}">表单辅助</router-link></el-menu-item>
    <el-menu-item index="/helpFind"><router-link :to="{name:'helpFind'}">查询辅助</router-link></el-menu-item>
    <el-menu-item index="/crud"><router-link :to="{name:'crud'}">CRUD</router-link></el-menu-item>
    <el-menu-item index="/websql"><router-link :to="{name:'webSQL'}">websql</router-link></el-menu-item>

  </el-menu>
  <router-view/>
</template>

<script>
// import { useRouter } from 'vue-router'
import lifeCycle from '@/jsmodule/lifecycle.js'
import { ref } from 'vue'

export default {
  setup () {
    console.log('App')
    lifeCycle('App')

    const activeIndex = ref('/')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    // 设置一个路由守卫
    // const router = useRouter()
    // router.beforeEach((to, from, next) => {
    //   console.log('路由守卫里的：', userOnline)
    //   if (to.name !== 'eleForm' && !userOnline.isOnline) {
    //     alert('您还没有登录，请先登录！')
    //    next({ name: 'eleForm' })
    //  } else {
    //    next()
    //  }
    // })

    return {
      activeIndex,
      handleSelect
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
