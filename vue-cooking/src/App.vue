<template>
  <div>
    <h1>Github App</h1>
    <GitHubTokenForm></GitHubTokenForm>
    <!-- <Repos></Repos>
    <User></User> -->
  </div>
</template>

<script>
import GitHubTokenForm from './components/GitHubTokenForm.vue';
// import Repos from './components/Repos.vue';
// import User from './components/User.vue';

export default {
  name: 'App',
  components: {
    GitHubTokenForm,
    // Repos,
    // User
  }
}
</script>
