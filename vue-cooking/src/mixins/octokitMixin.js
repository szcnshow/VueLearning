import {Octokit} from "https://cnd.skypack.dev/@octokit/rest"

export const octokitMixin = {
  methods:{
    createOctokitClient() {
      return new Window.Octokit({
        auth: localStorage.getItem("github-token"),
      });
    }
  }
}