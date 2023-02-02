<template>
    <div class="bg-primary h-16 flex justify-between items-center p-4">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80.81 107.23"
          class="fill-base-100 w-10 -ml-2 -mt-1"
        >
          <g>
            <path
              d="M52.85,68.14H36.17v30.11h-5.17c-6.74,0-12.21-5.47-12.21-12.21V17.18h34.05c6.78,0,12.28,5.5,12.28,12.28
            v26.41C65.13,63.16,60.26,68.14,52.85,68.14z M47.41,33.39H36.17v18.53h11.24c0.19,0,0.35-0.16,0.35-0.35V33.74
            C47.76,33.55,47.6,33.39,47.41,33.39z"
            />
          </g>
        </svg>
        <div class="mx-4">
          <p class="font-bold ">Asset Tracker</p>
          <p class="font-bold text-lg">Project List</p>
        </div>
    </div>
</div>
  <ul class="w-1/3">
    <li v-for="project in projects">
      <ProjectItem :projectobj="project"/>
    </li>
  </ul>
</template>
<script>
import axios from "axios";
import ProjectItem from './project_item.vue'
export default {
  data() {
    return {
      projects: [],
    }
  },
  components: {
    ProjectItem,
  },
  mounted() {
    this.get_all_projects();
  },
  methods:{
    get_all_projects(){
      axios({
        url: "/project",
        baseURL: import.meta.env.VITE_BASEURL,
        auth: {
          username: "pharos",
          password: "pharos",
        }
      }).then((response) => {
        this.projects = response.data;
      });
    }
  }
}
</script>
