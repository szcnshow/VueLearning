<template>
  <el-form :inline="true" class="demo-form-inline" v-model="userinfo">
    <el-form-item label="Approved by">
      <el-input v-model="userinfo.username" placeholder="username"/>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input v-model="userinfo.password" placeholder="password" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="onSubmit2">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>    //lang="ts" 
import { reactive } from 'vue'
import axios from 'axios'
import {APIURL} from '@/constants'
import { useRouter } from "vue-router";

const userinfo = reactive({
  username: 'newinsert',
  password: 'aihong',
})

// eslint-disable-next-line no-unused-vars
const router = useRouter();

// const onSubmit = () => {
//   onSubmit2();
// };

async function onSubmit2() {
  const {username, password} = userinfo;
  try {
    const {  data } = await axios.post(`${APIURL}/users/login/${username}`, {password});
    const status = data.status;
    if(status == 200) {
      localStorage.setItem('token', data.token);
      router.push({
          path: "/fielddict"
      });    
    } else {
      throw new Error(data.message);
    }
  } catch( error) {
    if(error.response != undefined) {
      alert(error.response.data);  
    } else if(error.message != undefined) {
      alert(error.message);
    } else {
      alert(error);
    }
  }
}
</script>
