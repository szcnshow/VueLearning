<template>
  <router-view></router-view>
  <!-- <li><router-link to="/">Login</router-link></li>
  <li><router-link to="/samples">Samples</router-link></li> -->
</template>

<script>
// import LoginView from './views/LoginView.vue'
//import FieldDictView from './views/FieldDictView.vue'
//import DynamicFormView from './views/DynamicFormView.vue'

export default {
  name: 'App',
  components: {
    //DynamicFormView,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
