// export const octokitMixin = {
//   methods: {
//     createOctokitClient() {
//       return new window.Octokit({
//         auth: localStorage.getItem("github-token"),
//       });
//     }
//   }
// }

//  import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

import { Octokit } from "@octokit/rest";

export const octokitMixin = {
  methods: {
    createOctokitClient() {
      return new Octokit({
        auth: localStorage.getItem('github-token'),
      })
    }
  },
}