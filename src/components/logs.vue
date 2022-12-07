<template>
  <div v-html="content" />
</template>

<script>
import axios from "axios";

export default {
  components: {},
  props: ["proj_id", "proj_load"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    loadLogs() {
      const date_now = Date.now();
      axios({
        url: "logs/" + this.proj_id,
        baseURL: import.meta.env.VITE_BASEURL,
      }).then((response) => {
        console.log(response.data);
        this.content = response.data[0].log_message;
      });
    },
  },
  watch: {
    proj_load(val, oldVal) {
      this.loadLogs();
    },
  },
};
</script>

<style>
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.55em;
  }

  ul,
  ol {
    padding: 0 1rem;
    list-style-type: circle;
  }

  blockquote {
    padding-left: 1rem;
    margin-left: 1rem;
    border-left: 3px solid black;
  }
}
</style>
