<template>
  <div>
    <h3>create project</h3>
  <input v-model="project_name" type="text" placeholder="Project Name" class="input input-bordered w-full max-w-xs" />
  <button @click="create_project" class="btn">Create Project</button>
  </div>
</template>

<script>

import axios from "axios";

export default {
  setup(){
    let project_name = "My Project"
    return {
      project_name,
    }
  },
  methods:{
    create_project(){
      axios.post("http://localhost:8000", {name: this.project_name}).then((response) => {
        console.log("project " + this.project_name + " added.")
        console.log(response.data._id)
        this.$router.push({ name: 'project_link', params: { id: response.data._id } })
      })
    }
  }
}
</script>
