<template>
  <div>

  </div>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    this.get_all_projects();
  },
  methods:{
    get_all_projects(){
      axios({
        url: "/project",
        baseURL: import.meta.env.VITE_BASEURL,
        auth: {
          username: "jojop",
          password: "jojo",
        }
      }).then((response) => {
        console.log(response.data);
      });
    }
  }
}
</script>
