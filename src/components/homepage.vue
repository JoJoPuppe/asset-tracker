<template>
  <div class="flex justify-center bg-primary items-center h-full">
    <div class="flex flex-col justify-center space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 841.89 595.28"
        class="fill-base-100 w-52"
      >
        <g>
          <path
            d="M452.77,328.12h-48.76v88.04h-15.1c-19.71,0-35.69-15.98-35.69-35.69V179.11h99.56
        c19.83,0,35.9,16.07,35.9,35.9v77.21C488.67,313.56,474.45,328.12,452.77,328.12z M436.86,226.51h-32.85v54.18h32.85
        c0.56,0,1.02-0.46,1.02-1.02v-52.14C437.88,226.97,437.43,226.51,436.86,226.51z"
          />
        </g>
      </svg>
      <p class="text-center font-bold text-2xl">Create Project</p>
      <input
        v-model="project_name"
        type="text"
        placeholder="Project Name"
        class="input text-primary input-bordered w-full max-w-xs"
      />
      <button @click="create_project" class="btn btn-accent">
        Create Project
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  setup() {
    let project_name = "My Project";
    return {
      project_name,
    };
  },
  methods: {
    create_project() {
      axios
        ({method:"post", url: "/project", baseURL: import.meta.env.VITE_BASEURL, data:{ name: this.project_name }})
        .then((response) => {
          console.log("project " + this.project_name + " added.");
          console.log(response.data._id);
          this.$router.push({
            name: "project_link",
            params: { id: response.data._id },
          });
        });
    },
  },
};
</script>
