<template>
  <form @submit.prevent = "saveToToken">
    <div>
      <label for="githubToken">Github Token</label>
      <br />
      <inpu id="githubToken" v-model="githubToken"/>      
    </div>
    <div>
      <input type="submit" value="Save token"/>
      <button type="button" @click="clearToken">Clear Token</button>
    </div>
  </form>
</template>

<script>
 export default {
   name: "GitHubTokenForm",
   data() {
     return {
       githubToken: ""
     };
   },
   beforeMount() {
     this.githubToken = localStorage.getItem("github-token");
   },
   methods: {
     saveToToken() {
       localStorage.setItem("github-token", this.githubToken);
     },
     clearToken() {
       localStorage.clear();
     }
   }
 }
</script>