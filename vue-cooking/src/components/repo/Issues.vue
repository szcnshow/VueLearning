<template>
  <div v-if="issues.length > 0" >
    <button @click="showIssues = !showIssues">{{showIssues ? 'Hide' : 'Show'}}</button>
    <div v-if="showIssues">
      <div v-for="i of issues" :key="i.id">
        <h3>{{i.title}}</h3>
        <a :href="i.url">Go to issue</a>
        <IssueComments :owner="owner" :repo="repo" :issueNumber="i.issueNumber"></IssueComments>
      </div>
    </div>
  </div>
</template>

<script>
  import { octokitMixin } from '../../mixins/octokitMixin'
  import IssureComments from './issue/Comments.vue'

 export default {
   name: "RepoIssue",
   Components: {
     IssueComments,
   },
   props: {
     owner: {
       type: String,
       required: true,
     },
     repo: {
       type: String,
       required: true,
     }
   },
   mixins: [octokitMixin],

   data() {
     return {
       issure: [],
       showIssues: false,
     }
   },

   methods: {
     async getRepoIssue(owner, repo) {
       const octokit = this.createOctokitClient();
       const {data: issues} = await octokit.issues.listForRepo({
         owner,
         repo,
       });
       this.issues = issues;
     }
   },
   
   watch: {
     owner: {
       handle(val){
         this.getRepoIssue(val, this.repo);
       }
     },
     repo: {
       handle(val) {
         this.getRepoIssue(this.owner, val);
       }
     }
   },

   created() {
     this.getRepoIssue(this.owner, this.repo);
   }

 }
</script>