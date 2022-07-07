<template>
  <div>
    <h1>Github App</h1>
    <GitHubTokenForm />
    <userCtrl />
    <reposCtrl />
  </div>
</template>

<script>
import GitHubTokenForm from "./components/GitHubTokenForm.vue";
import reposCtrl from "./components/Repos.vue";
import userCtrl from "./components/User.vue";

export default {
  name: "App",
  components: {
    GitHubTokenForm,
    reposCtrl,
    userCtrl,
  },
};
</script>
